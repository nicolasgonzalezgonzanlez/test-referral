import { channelResponseDto } from "../../src/dtos/channel";
import * as ChannelRepository from "../../src/infraestructure/repository/channelRepository"
import { channelService } from "../../src/services";

describe('Channel Service', () => {
    let repository: ChannelRepository.channelRepository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new ChannelRepository.channelRepository()
        jest.spyOn(ChannelRepository, 'getChannelRepository').mockImplementation(() => repository)
    });

    it('should get all channels', async () => {
        const mockResponse = [] as channelResponseDto[]
        jest.spyOn(repository, 'getAllChannel').mockImplementation(() => Promise.resolve(mockResponse))

        const result = await channelService.getChannelService()

        expect(result).toEqual(mockResponse)
        expect(repository.getAllChannel).toHaveBeenNthCalledWith(1)
    })
})