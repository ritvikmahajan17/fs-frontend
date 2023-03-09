import axios from 'axios';
import { BACKEND_URL_AUTH } from '../../constants/apiEndPoints';


const makeRequest = async (
  apiEndPoint,
  dynamicConfig = {},
) => {
  try {
    const requestDetails = {
      baseURL: BACKEND_URL_AUTH,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (e) {
    //Tod0
  }
};

export default makeRequest;