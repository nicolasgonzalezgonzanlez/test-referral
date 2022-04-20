import { bannerListItemDto, bannerResponseDto } from "../../../src/dtos/banner"
import { banner, channel, sectionBanner, sectionChannel } from "../../../src/infraestructure/entities"
import { bannerEntityToDto, bannerListItemToDto } from "../../../src/mapper/entityToDTO/banner"

describe('Banner entity to dto mapper', () => {

    it('should return a bannerResponseDto correctly', () => {
        const toBeMapped = {
            banner_id: 1,
            name: 'test'
        } as banner
        const expectedResult = {
            bannerId: 1,
            name: 'test'
        } as bannerResponseDto

        const result = bannerEntityToDto(toBeMapped)

        expect(result).toEqual(expectedResult)
    })

    it('should return a bannerListItemDto correctly - easy case', () => {
        const toBeMapped = {
            banner_id: 1,
            name: 'test',
            start_date: new Date('02-23-2023'),
            end_date: new Date('02-23-2023')
        } as banner
        const expectedResult = {
            bannerId: 1,
            name: 'test',
            startDate: new Date('02-23-2023'),
            endDate: new Date('02-23-2023'),
            imgBannerUrl: null,
            channel: null,
            section: null
        } as bannerListItemDto

        const result = bannerListItemToDto(toBeMapped)

        expect(result).toEqual(expectedResult)
    })

    it('should return a bannerListItemDto correctly - with section banner case', () => {
        const toBeMapped = {
            banner_id: 1,
            name: 'test',
            start_date: new Date('02-23-2023'),
            end_date: new Date('02-23-2023'),
            section_banner: [
                {
                    img_banner_url: 'someText',
                    section_banner_id: 1,
                }
            ] as sectionBanner[]
        } as banner
        const expectedResult = {
            bannerId: 1,
            name: 'test',
            startDate: new Date('02-23-2023'),
            endDate: new Date('02-23-2023'),
            imgBannerUrl: 'someText',
            channel: null,
            section: null
        } as bannerListItemDto

        const result = bannerListItemToDto(toBeMapped)

        expect(result).toEqual(expectedResult)
    })

    it('should return a bannerListItemDto correctly - with many section banners case', () => {
        const toBeMapped = {
            banner_id: 1,
            name: 'test',
            start_date: new Date('02-23-2023'),
            end_date: new Date('02-23-2023'),
            section_banner: [
                {
                    img_banner_url: 'someText',
                    section_banner_id: 1,
                    section_channel_id: 1,
                    section_channel: {
                        name: 'Section1',
                        channel_id: 1,
                        channel: {
                            name: 'ChannelName'
                        } as channel
                    } as sectionChannel
                },
                {
                    img_banner_url: 'otherText',
                    section_banner_id: 2,
                    section_channel_id: 2,
                    section_channel: {
                        name: 'Section2',
                        channel_id: 2,
                        channel: {
                            name: 'OtherChannel'
                        } as channel
                    } as sectionChannel
                }
            ] as sectionBanner[]
        } as banner
        const expectedResult = {
            bannerId: 1,
            name: 'test',
            startDate: new Date('02-23-2023'),
            endDate: new Date('02-23-2023'),
            imgBannerUrl: 'someText',
            channel: 'ChannelName,OtherChannel',
            section: 'Section1,Section2'
        } as bannerListItemDto

        const result = bannerListItemToDto(toBeMapped)

        expect(result).toEqual(expectedResult)
    })
})