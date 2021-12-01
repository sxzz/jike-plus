import axios from 'axios'
import axiosRetry from 'axios-retry'
import { getAccessToken } from '../utils/user'

const request = axios.create({
  baseURL: 'https://api.ruguoapp.com/1.0/',
  headers: {
    'x-jike-access-token': getAccessToken(),
  },
  responseType: 'json',
})
axiosRetry(request, {
  retries: 5,
  retryDelay: () => 2000,
  retryCondition: (err) => err.response?.status === 429,
})

export { request }
