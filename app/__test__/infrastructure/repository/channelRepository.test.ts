import { channelRepository } from '../../../src/infraestructure/repository';
import { channel } from '../../../src/infraestructure/entities';
import { channelResponseDto } from '../../../src/dtos/channel';

describe('channel repository', () => {
    let repository: channelRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new channelRepository();
    });

    it('Should create new repository', async () => {
        let mockResponse: any = 
        [
            {
              channel_id: 1,
              name: 'WEB',
              code: 'W-BCK',
              description: 'WEB-BACKO',
              row_status: true,
              created_by: 'Dnniz',
              updated_by: null,
              create_date:  new Date("2021-09-17T17:09:17.738Z"),
              updated_date: null
            }
          ] as channel[];

        let mockResult: any = 
        [
            {
              channelId: 1,
              name: 'WEB',
              code: 'W-BCK',
              description: 'WEB-BACKO',
            }
          ] as channelResponseDto[];

        jest.spyOn(repository, 'find').mockImplementation(() => mockResponse);

        expect(await repository.getAllChannel()).toEqual(mockResult)
    })
})