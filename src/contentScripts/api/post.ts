import { request } from '.'
import type {
  Post,
  PostRequest,
  PostResponse,
  LikedUsersRequest,
  LikedUsersResponse,
  User,
} from '../types'

export const getPostsByUsername = async (username: string, limit: number) => {
  const posts: Post[] = []
  let lastId: string | undefined = undefined
  do {
    const data: PostRequest = {
      username,
      limit,
    }
    if (lastId) data.loadMoreKey = { lastId }
    const { data: resp } = await request.post<PostResponse>(
      'personalUpdate/single',
      data
    )
    lastId = resp.loadMoreKey?.lastId
    posts.push(...resp.data)
  } while (lastId)

  return posts
}

export const getLikedUsers = async (id: string, limit: number) => {
  const users: User[] = []
  let loadMoreKey: string | undefined = undefined
  do {
    const data: LikedUsersRequest = {
      id,
      limit,
    }
    if (loadMoreKey) data.loadMoreKey = loadMoreKey
    const { data: resp } = await request.post<LikedUsersResponse>(
      'originalPosts/listLikedUsers',
      data
    )
    loadMoreKey = resp.loadMoreKey
    users.push(...resp.data)
  } while (loadMoreKey)
  return users
}
