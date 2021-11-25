import { parse } from 'cookie'

export const getAccessToken = () =>
  parse(document.cookie)['x-jike-access-token']
