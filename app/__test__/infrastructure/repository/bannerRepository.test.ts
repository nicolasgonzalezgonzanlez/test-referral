import { banner } from '../../../src/infraestructure/entities';
import { bannerRepository } from '../../../src/infraestructure/repository/bannerRepository';
import { mockCreateQueryBuilder, mockCQBForUpdateAndDelete } from '../../mocks/createQueryBuilder';

describe('Banner Repository', () => {
  let repo: bannerRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    repo = new bannerRepository();
  });

  it('should get all banners', async () => {
    const mockDbResponse = [
      {
        banner_id: 1,
        name: 'test',
      },
    ] as banner[];

    const createQueryBuilderMock = mockCreateQueryBuilder(mockDbResponse);

    jest.spyOn(repo, 'createQueryBuilder').mockImplementation(() => createQueryBuilderMock);
    const result = await repo.getBanners();

    expect(result).toEqual(mockDbResponse);
    expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it('should delete banner', async () => {
    const mappedResponse = {
      banner_id: 1,
      name: 'name',
      start_date: new Date('11-02-2023'),
      end_date: new Date('11-02-2023'),
      img_banner_url: null,
      section: null,
    } as any;

    jest.spyOn(repo, 'deleteBanner').mockImplementation(() => Promise.resolve(mappedResponse));

    await repo.deleteBanner(1);

    expect(repo.deleteBanner).toHaveBeenCalled();
  });
});
