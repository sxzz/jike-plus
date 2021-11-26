import axios from 'axios'
import axiosRetry from 'axios-retry'
import { getAccessToken } from '../utils/user'

export const request = axiosRetry(
  axios.create({
    baseURL: 'https://api.ruguoapp.com/1.0/',
    headers: {
      'x-jike-access-token': getAccessToken(),
    },
    responseType: 'json',
  }),
  {
    retries: 5,
    retryDelay: () => 1500,
    retryCondition: (err) => err.response?.status === 429,
  }
)
