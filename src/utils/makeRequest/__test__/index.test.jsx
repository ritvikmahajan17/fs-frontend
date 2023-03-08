import makeRequest from '../index';
import axios from 'axios';
// Define some mock data to use in our tests
const mockApiEndPoint = {
  url: '/some-url',
  method: 'get',
};

const mockData = {
  message: 'Hello, world!',
};

// Define some mock Axios behavior
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    request: jest.fn(() => Promise.resolve(mockData)),
  })),
}));

describe('makeRequest', () => {
  it('should call axios with the correct request details', async () => {
    // Call the makeRequest function with our mock endpoint
    await makeRequest(mockApiEndPoint);

    // Check that axios was called with the correct parameters
    expect(axios.create().request).toHaveBeenCalledWith({
      baseURL: 'http://your-backend-url-here',
      url: '/some-url',
      method: 'get',
    });
  });

  it('should return the response data on successful request', async () => {
    // Call the makeRequest function with our mock endpoint
    const responseData = await makeRequest(mockApiEndPoint);

    // Check that the response data is correct
    expect(responseData).toEqual(mockData);
  });

  it('should handle errors correctly', async () => {
    // Simulate an error response from the server
    axios
      .create()
      .request.mockImplementationOnce(() =>
        Promise.reject(new Error('Server error'))
      );

    // Call the makeRequest function with our mock endpoint
    const responseData = await makeRequest(mockApiEndPoint);

    // Check that the function returns null on error
    expect(responseData).toBeNull();
  });
});
