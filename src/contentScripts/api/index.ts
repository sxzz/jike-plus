import axios from 'axios'
import rateLimit from 'axios-rate-limit'
import { getAccessToken } from '../utils/user'

export const request = rateLimit(
  axios.create({
    baseURL: 'https://api.ruguoapp.com/1.0/',
    headers: {
      'x-jike-access-token': getAccessToken(),
    },
    responseType: 'json',
  }),
  { maxRequests: 1, perMilliseconds: 1500 }
)
