import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const URL = 'https://jsonplaceholder.typicode.com';
const RELATIVE_PATH = 'posts';
const DATA = { data: 'test' };

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('checks if instance is created with correct base url', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(RELATIVE_PATH);

    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL: URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetMock = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetMock.mockResolvedValue(DATA);

    await throttledGetDataFromApi(RELATIVE_PATH);
    jest.runOnlyPendingTimers();

    expect(axiosGetMock).toHaveBeenCalledWith(RELATIVE_PATH);
  });

  test('should return response data', async () => {
    const axiosGetMock = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetMock.mockResolvedValue(DATA);
    const result = await throttledGetDataFromApi(RELATIVE_PATH);

    expect(result).toEqual(DATA.data);
  });
});
