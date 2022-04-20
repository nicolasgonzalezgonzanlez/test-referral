import { promotionRepository } from '../../../src/infraestructure/repository/promotionRepository';
import { promotionRequestDto, promotionRequestFilterDto, promotionRequestUpdateDto, promotionResponseDto } from '../../../src/dtos/promotion';
import { promotion } from '../../../src/infraestructure/entities';
import { mockCreateQueryBuilder } from '../../mocks/createQueryBuilder';

describe('Promotion Repository', () => {
  let repository: promotionRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    repository = new promotionRepository();
  });

  const mockDbPromotionsResponse: any = [
    {
      promotion_id: 15,
      name: "Dev mercados",
      code: "",
      description: "",
      end_date: new Date("2021-10-25T23:30:00.000Z"),
      link_tyc: "sin términos y condiciones",
      ref_promotion: "",
      information: "",
      promotion_value: 0.00,
      equivalency_code: 'code',
      start_date: new Date("2021-10-03T23:30:00.000Z"),
      status: "",
      high_date: new Date("2021-10-01T23:31:00.000Z"),
      low_date: new Date("2021-10-30T23:31:00.000Z"),
      type_promotion: {
          type_promotion_id: 3,
          code: "TP002",
          name: "Monto",
          symbol: "$"
      },
      campaign_id: 5,
      img_details_url: "",
      img_banner_url: "",
      is_active: true,
    }
  ] as unknown as promotion[]
  const mockPromotionsResponse: any = [
    {
      promotionId: 15,
      name: "Dev mercados",
      code: "",
      description: "",
      endDate: new Date("2021-10-25T23:30:00.000Z"),
      linkTyc: "sin términos y condiciones",
      refPromotion: "",
      information: "",
      promotionValue: 0.00,
      startDate: new Date("2021-10-03T23:30:00.000Z"),
      status: "",
      highDate: new Date("2021-10-01T23:31:00.000Z"),
      lowDate: new Date("2021-10-30T23:31:00.000Z"),
      typePromotion: {
          typePromotionId: 3,
          code: "TP002",
          name: "Monto",
          symbol: "$"
      },
      campaignId: 5,
      imgDetailsUrl: "",
      imgBannerUrl: "",
      isActive: true,
      equivalencyCode: 'code',
    }
  ] as promotionResponseDto[];

  it('should get all promotions without filters', async () => {
    const mockFilter: any = {
        filterValue: null,
        highDate: null,
        lowDate: null,
        typePromotionId: null,
    } as promotionRequestFilterDto;

    let createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoinAndSelect: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getRawMany: () => mockDbPromotionsResponse
    }
    const andWhereMock = jest.fn(() => createQueryBuilder)
    createQueryBuilder.andWhere = andWhereMock
    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

    const result = await repository.getAllPromotion(mockFilter);

    expect(result).toEqual(mockPromotionsResponse);
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1)
    expect(andWhereMock).not.toHaveBeenCalled()
  });

  it('should get all promotions with filterValue filter', async () => {
    const mockFilter: any = {
        filterValue: 'filterValue',
        highDate: null,
        lowDate: null,
        typePromotionId: null,
    } as promotionRequestFilterDto;

    let createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoinAndSelect: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getRawMany: () => mockDbPromotionsResponse
    }
    const andWhereMock = jest.fn(() => createQueryBuilder)
    createQueryBuilder.andWhere = andWhereMock
    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

    const result = await repository.getAllPromotion(mockFilter);

    expect(result).toEqual(mockPromotionsResponse);
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1)
    expect(andWhereMock).toHaveBeenCalledTimes(1)
  });

  it('should get all promotions with filterValue and highDate filter', async () => {
    const mockFilter: any = {
        filterValue: 'filterValue',
        highDate: new Date(),
        lowDate: null,
        typePromotionId: null,
    } as promotionRequestFilterDto;

    let createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoinAndSelect: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getRawMany: () => mockDbPromotionsResponse
    }
    const andWhereMock = jest.fn(() => createQueryBuilder)
    createQueryBuilder.andWhere = andWhereMock
    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

    const result = await repository.getAllPromotion(mockFilter);

    expect(result).toEqual(mockPromotionsResponse);
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1)
    expect(andWhereMock).toHaveBeenCalledTimes(2)
  });

  it('should get all promotions with filterValue, highDate and typePromotion filter', async () => {
    const mockFilter: any = {
        filterValue: 'filterValue',
        highDate: new Date(),
        lowDate: null,
        typePromotionId: 1,
    } as promotionRequestFilterDto;

    let createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoinAndSelect: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getRawMany: () => mockDbPromotionsResponse
    }
    const andWhereMock = jest.fn(() => createQueryBuilder)
    createQueryBuilder.andWhere = andWhereMock
    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

    const result = await repository.getAllPromotion(mockFilter);

    expect(result).toEqual(mockPromotionsResponse);
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1)
    expect(andWhereMock).toHaveBeenCalledTimes(3)
  });

  it('should get all promotions with filterValue, highDate and lowDate filter', async () => {
    const mockFilter: any = {
        filterValue: 'filterValue',
        highDate: new Date(),
        lowDate: new Date,
        typePromotionId: null,
    } as promotionRequestFilterDto;

    let createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoinAndSelect: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getRawMany: () => mockDbPromotionsResponse
    }
    const andWhereMock = jest.fn(() => createQueryBuilder)
    createQueryBuilder.andWhere = andWhereMock
    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

    const result = await repository.getAllPromotion(mockFilter);

    expect(result).toEqual(mockPromotionsResponse);
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1)
    expect(andWhereMock).toHaveBeenCalledTimes(2)
  });

  it('should get all promotions with filterValue and lowDate filter', async () => {
    const mockFilter: any = {
        filterValue: 'filterValue',
        highDate: null,
        lowDate: new Date(),
        typePromotionId: null,
    } as promotionRequestFilterDto;

    let createQueryBuilder: any = {
      select: () => createQueryBuilder,
      innerJoinAndSelect: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getRawMany: () => mockDbPromotionsResponse
    }
    const andWhereMock = jest.fn(() => createQueryBuilder)
    createQueryBuilder.andWhere = andWhereMock
    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

    const result = await repository.getAllPromotion(mockFilter);

    expect(result).toEqual(mockPromotionsResponse);
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1)
    expect(andWhereMock).toHaveBeenCalledTimes(2)
  });

  it('should count all promotions', async () => {
    // const allPromosMock = [{}] as promotionResponseDto[]
    const allPromosMock: any = 
    [
      {
        campaignId: undefined, 
        code: undefined, 
        description: undefined,
        endDate: undefined, 
        equivalencyCode: undefined, 
        highDate: undefined, 
        imgBannerUrl: undefined, 
        imgDetailsUrl: undefined, 
        information: undefined, 
        isActive: undefined, 
        linkTyc: undefined, 
        lowDate: undefined, 
        name: undefined, 
        promotionId: undefined, 
        promotionValue: undefined, 
        refPromotion: undefined, 
        startDate: undefined, 
        status: undefined, 
        typePromotion: 
        {
          code: undefined, 
          name: undefined, 
          symbol: undefined, 
          typePromotionId: undefined
        }}
      ] as unknown as promotionResponseDto[];
    
      const createQueryBuilder = mockCreateQueryBuilder(allPromosMock)

    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);
    
    const result = await repository.getTodayPromotions();

    expect(result).toEqual(allPromosMock);
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it('should get a promotion by id', async () => {
    const mockDbResponse: any = {
      promotion_id: 15,
      name: "Dev mercados",
      code: "",
      description: "",
      end_date: new Date("2021-10-25T23:30:00.000Z"),
      link_tyc: "sin términos y condiciones",
      ref_promotion: "",
      information: "",
      promotion_value: 0.00,
      equivalency_code: "ABC123",
      start_date: new Date("2021-10-03T23:30:00.000Z"),
      status: "",
      high_date: new Date("2021-10-01T23:31:00.000Z"),
      low_date: new Date("2021-10-30T23:31:00.000Z"),
      type_promotion: {
          type_promotion_id: 3,
          code: "TP002",
          name: "Monto",
          symbol: "$"
      },
      campaign_id: 5,
      img_details_url: "",
      img_banner_url: "",
      is_active: true,
    } as unknown as promotion;

    const mockResponse: any = {
      promotionId: 15,
      name: "Dev mercados",
      code: "",
      description: "",
      endDate: new Date("2021-10-25T23:30:00.000Z"),
      linkTyc: "sin términos y condiciones",
      refPromotion: "",
      information: "",
      promotionValue: 0.00,
      equivalencyCode: "ABC123",
      startDate: new Date("2021-10-03T23:30:00.000Z"),
      status: "",
      highDate: new Date("2021-10-01T23:31:00.000Z"),
      lowDate: new Date("2021-10-30T23:31:00.000Z"),
      typePromotion: {
          typePromotionId: 3,
          code: "TP002",
          name: "Monto",
          symbol: "$"
      },
      campaignId: 5,
      imgDetailsUrl: "",
      imgBannerUrl: "",
      isActive: true,
    } as promotionResponseDto;

    jest.spyOn(repository, 'findOneOrFail').mockImplementation(() => mockDbResponse);
    const result = await repository.getPromotionById(1);

    expect(result).toEqual(mockResponse);
  });

  it('should create a promotion', async () => {

    const mockDbPromotion: promotion = {
      name: "Dev mercados",
      code: "",
      description: "string",
      end_date: new Date("2021-10-22T16:03:00.312Z"),
      link_tyc: "sin términos y condiciones",
      ref_promotion: "",
      information: "",
      promotion_value: 0.00,
      equivalency_code: "ABC123",
      start_date: new Date("2021-10-22T18:03:00.312Z"),
      status: "",
      high_date: new Date("2021-10-01T23:31:00.000Z"),
      low_date: new Date("2021-10-30T23:31:00.000Z"),
      type_promotion_id: 3,
      campaign_id: 5,
      img_details_url: "",
      img_banner_url: "",
    } as promotion;

    const mockPromotion: promotionRequestDto = {
      name: "Dev mercados",
      code: "",
      description: "string",
      endDate: new Date("2021-10-22T16:03:00.312Z"),
      linkTyc: "sin términos y condiciones",
      refPromotion: "",
      information: "",
      promotionValue: 0.00,
      equivalencyCode: "ABC123",
      startDate: new Date("2021-10-22T18:03:00.312Z"),
      status: "",
      highDate: new Date("2021-10-01T23:31:00.000Z"),
      lowDate: new Date("2021-10-30T23:31:00.000Z"),
      typePromotionId: 3,
      campaignId: 5,
      imgDetailsUrl: "",
      imgBannerUrl: ""
    };

    const mockResponse: any = {
      promotionId: 15,
      name: "Dev mercados",
      code: "",
      description: "string",
      endDate: new Date("2021-10-22T16:03:00.312Z"),
      linkTyc: "sin términos y condiciones",
      refPromotion: "",
      information: "",
      promotionValue: 0.00,
      startDate: new Date("2021-10-22T18:03:00.312Z"),
      status: "",
      highDate: new Date("2021-10-01T23:31:00.000Z"),
      lowDate: new Date("2021-10-30T23:31:00.000Z"),
      typePromotion: {
          typePromotionId: undefined,
          code: undefined,
          name: undefined,
          symbol: undefined
      },
      equivalencyCode: 'ABC123',
      campaignId: 5,
      imgDetailsUrl: "",
      imgBannerUrl: "",
      isActive: undefined,
    } as unknown as promotionResponseDto;

    jest.spyOn(repository, 'create').mockImplementation(() => mockDbPromotion);
    jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve({...mockDbPromotion, promotion_id: 15} as promotion));

    const result = await repository.postCreatePromotion(mockPromotion);

    expect(result).toEqual(mockResponse);
  });

  it('should update a promotion', async () => {
    const mockDbPromotion: promotion = {
      name: "Dev mercados",
      code: "",
      description: "string",
      end_date: new Date("2021-10-22T16:03:00.312Z"),
      link_tyc: "sin términos y condiciones",
      ref_promotion: "",
      information: "",
      promotion_value: 0.00,
      equivalency_code: "ABC123",
      start_date: new Date("2021-10-22T18:03:00.312Z"),
      status: "",
      high_date: new Date("2021-10-01T23:31:00.000Z"),
      low_date: new Date("2021-10-30T23:31:00.000Z"),
      type_promotion_id: 3,
      campaign_id: 5,
      img_details_url: "",
      img_banner_url: "",
      promotion_id: 1,
    } as promotion;

    const mockPromotion: promotionRequestUpdateDto = {
      name: "string",
      description: "string",
      endDate: new Date("2021-10-22T16:03:00.312Z"),
      linkTyc: "string",
      refPromotion: "string",
      information: "string",
      startDate: new Date("2021-10-22T18:03:00.312Z"),
      highDate: undefined,
      lowDate: undefined,
      equivalencyCode: "ABC123",
      campaignId: undefined,
      imgDetailsUrl: "string",
      imgBannerUrl: "string"
    };

    jest.spyOn(repository, 'findOneOrFail').mockImplementation(() => Promise.resolve(mockDbPromotion));
    jest.spyOn(repository, 'create').mockImplementation(() => mockDbPromotion);
    jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(mockDbPromotion));

    await repository.putUpdatePromotion(1, mockPromotion);

    expect(repository.findOneOrFail).toHaveBeenCalled();
    expect(repository.create).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a promotion', async () => {

    const mockDbPromotion: promotion = {
      name: "Dev mercados",
      code: "",
      description: "string",
      end_date: new Date("2021-10-22T16:03:00.312Z"),
      link_tyc: "sin términos y condiciones",
      ref_promotion: "",
      information: "",
      promotion_value: 0.00,
      equivalency_code: "ABC123",
      start_date: new Date("2021-10-22T18:03:00.312Z"),
      status: "",
      high_date: new Date("2021-10-01T23:31:00.000Z"),
      low_date: new Date("2021-10-30T23:31:00.000Z"),
      type_promotion_id: 3,
      campaign_id: 5,
      img_details_url: "",
      img_banner_url: "",
      promotion_id: 1,
    } as promotion;

    jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(mockDbPromotion));

    await repository.deletePromotion({} as promotion);

    expect(repository.save).toHaveBeenCalled();
  });

  it('should return true if promotion does not exists', async () => {
    const createQueryBuilder = mockCreateQueryBuilder(undefined)
    createQueryBuilder.getOne = () => undefined
    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

    expect(await repository.validExistPromotion(new Date, new Date, 1, 'name')).toEqual(true)
  })

  it('should return false if promotion already exists', async () => {
    const mockDbPromotion: promotion = {
      name: "Dev mercados",
      code: "",
      description: "string",
      end_date: new Date("2021-10-22T16:03:00.312Z"),
      link_tyc: "sin términos y condiciones",
      ref_promotion: "",
      information: "",
      promotion_value: 0.00,
      equivalency_code: "ABC123",
      start_date: new Date("2021-10-22T18:03:00.312Z"),
      status: "",
      high_date: new Date("2021-10-01T23:31:00.000Z"),
      low_date: new Date("2021-10-30T23:31:00.000Z"),
      type_promotion_id: 3,
      campaign_id: 5,
      img_details_url: "",
      img_banner_url: "",
      promotion_id: 1,
    } as promotion;

    const createQueryBuilder = mockCreateQueryBuilder(mockDbPromotion)
    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

    expect(await repository.validExistPromotion(new Date, new Date, 1, 'name')).toEqual(false)
  })

  it('should return true if query returns 1', async () => {
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      where: () => createQueryBuilder,
      andWhere: () => createQueryBuilder,
      getCount: () => 1,
    }

    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

    expect(await repository.isValidPromotion(1)).toEqual(true);
  });

  it('should return false if query returns 0', async () => {
    const createQueryBuilder: any = {
      select: () => createQueryBuilder,
      where: () => createQueryBuilder,
      andWhere: () => createQueryBuilder,
      getCount: () => 0,
    }

    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

    expect(await repository.isValidPromotion(1)).toEqual(false);
  });

  it('should deactivate a promotion', async () => {

    const promotionMockResponse: any = {
      promotion_id: 1
    }
    const promotionMockUpdated: any = {
      promotion_id: 1,
      is_active: false,
    }
    const promiseMockResponse: Promise<any> = new Promise((resolve) => resolve(promotionMockResponse))
    const promiseMockUpdatedResponse: Promise<any> = new Promise((resolve) => resolve(promotionMockUpdated))

    jest.spyOn(repository, 'findOneOrFail').mockImplementation(() => promiseMockResponse);
    jest.spyOn(repository, 'save').mockImplementation(() => promiseMockUpdatedResponse);

    await repository.putDeactivatePromotion(1)

    expect(repository.findOneOrFail).toHaveBeenCalled()
    expect(repository.save).toHaveBeenCalled()
  });

  it('should get a promotion by id with all its relations', async () => {
    const dbResponse = {
      promotion_id: 1
    } as promotion

    const createQueryBuilder = mockCreateQueryBuilder(dbResponse)

    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

    const result = await repository.getPromotionByIdWithRelations(1)

    expect(result).toEqual(dbResponse)
    expect(repository.createQueryBuilder).toHaveBeenCalled()
  })

});
