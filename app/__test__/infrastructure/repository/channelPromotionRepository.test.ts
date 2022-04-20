import { channelPromotionRequestDto } from "../../../src/dtos/channel";
import { channelPromotion } from "../../../src/infraestructure/entities";
import * as channelPromotionRepository from '../../../src/infraestructure/repository/channelPromotionRepository';
import { mockCreateQueryBuilder } from '../../mocks/createQueryBuilder';

describe('channel promotion repository', () => {
    let repository: channelPromotionRepository.channelPromotionRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new channelPromotionRepository.channelPromotionRepository();
        jest.spyOn(channelPromotionRepository, 'getChannelPromotionRepository').mockImplementation(() => repository);
    });
    it('should find a mobile promotion', async () => {
        const mockResponse: any = {
            p_img_details_url: 'string',
            p_name: 'PROMO',
            p_description: 'PROMOCION',
            p_ref_promotion: 'string',
            p_promotion_value: '10.0',
            tp_symbol: '%',
            p_information: 'info',
            rc_days: 'wednesday,thursday,friday,saturday',
            p_link_tyc: 'link',
            s_name: 'name',
        }

        const mockResult: any = {
            imgDetailsUrl: 'string',
            name: 'PROMO',
            description: 'PROMOCION',
            refPromotion: 'string',
            promotionValue: '10.0',
            promotionSymbol: '%',
            information: 'info',
            days: ['wednesday','thursday','friday','saturday'],
            linkTyc: 'link',
            section: 'name',
        }

        const createQueryBuilder = mockCreateQueryBuilder(mockResponse, true)
        jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

        expect(await repository.getPromotionDetailByIdAndChannelCode(47, 'COO1')).toEqual(mockResult)
    })

    it('should return null when no mobile promotion is found', async () => {
        const createQueryBuilder = mockCreateQueryBuilder(null, true)
        jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

        expect(await repository.getPromotionDetailByIdAndChannelCode(47, 'COO1')).toBe(null)
    })

    it('should get channel promotion id ', async () => {
        const mockReq: any = [{
            channel_promotion_id: 1,
            channel: {
                name: "test"
            },
            section: {
                name: "test",
                route_name: "test"
            },
            name: "test"
        }]
        const mockRes: any = [{
            channelName: "test",
            channelPromotionId: 1,
            sectionName: "test",
            sectionRouteName: "test"
        }]

        const createQueryBuilder: any = {
            select: () => createQueryBuilder,
            innerJoin: () => createQueryBuilder,
            innerJoinAndSelect: () => createQueryBuilder,
            andWhere: () => createQueryBuilder,
            where: () => createQueryBuilder,
            getMany: () => mockReq,
        }
        jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

        expect(await repository.getChannelPromotionId("1")).toEqual(mockRes)
    })

    it('should verify create channel promotion ', async () => {
        const mockReq: channelPromotionRequestDto = {
            promotionId: 1,
            channelId: 1,
            sectionId: 1
        }

        const createQueryBuilder: any = {
            select: () => createQueryBuilder,
            innerJoin: () => createQueryBuilder,
            andWhere: () => createQueryBuilder,
            where: () => createQueryBuilder,
            getRawOne: () => mockReq,
            getMany: () => createQueryBuilder,
        }

        jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

        expect(await repository.verifyCreateChannelPromotionId(mockReq)).toEqual(false)
    })

    it('should promotion for channel code ', async () => {
        const mockReq: any = [{
            promotion_id: "1",
            name: "test",
            img_banner_url: "testurl"
        }]

        const mockRes: any = [{
            promotionId: "1",
            name: "test",
            imgBannerUrl: "testurl"
        }]

        const createQueryBuilder: any = {
            select: () => createQueryBuilder,
            innerJoin: () => createQueryBuilder,
            andWhere: () => createQueryBuilder,
            where: () => createQueryBuilder,
            limit: () => createQueryBuilder,
            orderBy: () => createQueryBuilder,
            getRawMany: () => mockReq,
            getMany: () => createQueryBuilder,
        }

        jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

        expect(await repository.getPromotionForChannelCode(mockReq, "ASC")).toEqual(mockRes)
    })

    it('should get promotion detail by id and channel code ', async () => {
        const mockReq: any = {
            p_img_details_url: 'string',
            p_name: 'PROMO',
            p_description: 'PROMOCION',
            p_ref_promotion: 'string',
            p_promotion_value: '10.0',
            tp_symbol: '%',
            p_information: 'info',
            rc_days: 'wednesday,thursday,friday,saturday',
            p_link_tyc: 'link',
            s_name: 'name',
            s_route_name: "routename",
            p_start_date: "date",
            p_end_date: "date"
        }
        const mockRes: any = {
            imgDetailsUrl: 'string',
            name: "PROMO",
            description: "PROMOCION",
            refPromotion: "string",
            promotionValue: "10.0",
            promotionSymbol: '%',
            information: "info",
            days: ['wednesday', 'thursday', 'friday', 'saturday'],
            linkTyc: "link",
            section: "name",
            routeName: "routename",
            startDate: "date",
            endDate: "date"
        }

        const createQueryBuilder: any = {
            select: () => createQueryBuilder,
            innerJoin: () => createQueryBuilder,
            andWhere: () => createQueryBuilder,
            where: () => createQueryBuilder,
            getRawOne: () => mockReq,
            getMany: () => createQueryBuilder,
        }

        jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

        expect(await repository.getPromotionDetailByIdAndChannelCode(1, "1")).toEqual(mockRes)
    })

    it('should create a channel promotion', async () => {

        const mockResponse: channelPromotionRequestDto = {
            promotionId: 1,
            channelId: 1,
            sectionId: 1
        };
        const channelProm: channelPromotion = {
            channel_promotion_id: 0,
            channel_id: 1,
            promotion_id: 1,
            section_id: 1,
        }

        const create: any = {
            create: () => create
        }

        jest.spyOn(repository, 'create').mockImplementation(() => channelProm)
        jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(channelProm));

        await repository.postCreateChannelPromotion(mockResponse);

        expect(repository.create).toHaveBeenCalledTimes(1);
        expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should delete a channel promotion', async () => {
        jest.spyOn(repository, 'findOneOrFail').mockImplementation(() => Promise.resolve({} as channelPromotion))
        jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve({} as channelPromotion))

        await repository.deleteChannelPromotionId(1)

        expect(repository.findOneOrFail).toHaveBeenCalledTimes(1)
        expect(repository.save).toHaveBeenCalledTimes(1)
    })

    /* it('should failed while finding a channel promotion', async () => {
        jest.spyOn(repository, 'findOneOrFail').mockRejectedValue(undefined)
        //jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve({} as channelPromotion))
        
        try {
            await repository.deleteChannelPromotionId(1)
        } catch {

        }

        expect(repository.findOneOrFail).toThrowError()
        //expect(repository.save).toHaveBeenCalledTimes(1)
    }) */
})