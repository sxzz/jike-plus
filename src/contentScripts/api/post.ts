import { request } from '.'
import type { User } from './user'

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

export const getLikedUsers = async (
  type: PostType,
  id: string,
  limit: number
) => {
  const users: User[] = []
  let loadMoreKey: string | undefined = undefined
  do {
    const data: LikedUsersRequest = {
      id,
      limit,
    }
    if (loadMoreKey) data.loadMoreKey = loadMoreKey
    const { data: resp } = await request.post<LikedUsersResponse>(
      `${
        type === 'ORIGINAL_POST' ? 'originalPosts' : 'reposts'
      }/listLikedUsers`,
      data
    )
    loadMoreKey = resp.loadMoreKey
    users.push(...resp.data)
  } while (loadMoreKey)
  return users
}

export type PostType = 'ORIGINAL_POST' | 'REPOST'
export interface Post {
  actionTime: string
  id: string
  type: PostType
  content: string
  urlsInText: string[]
  status: string
  isCommentForbidden: boolean
  likeCount: number
  commentCount: number
  repostCount: number
  shareCount: number

  topic: {
    id: string
    type: string
    content: string
    subscribersCount: number
    squarePicture: {
      format: string
      picUrl: string
      middlePicUrl: string
      smallPicUrl: string
      thumbnailUrl: string
      watermarkPicUrl: string
      cropperPosX: number
      cropperPosY: number
      frameNumber: number
      width: number
      height: number
      livePhoto: string | null
    }
    briefIntro: string
    topicType: string
    operateStatus: string
    isValid: boolean
    isVerified: boolean
    topicId: number
    isSearchable: boolean
    likeIcon: string
    messagePrefix: string
    internalTags: unknown[]
    customTags: unknown[]
    auditStatus: string
    newCategory: unknown[]
    involvedUsers: null
    entryTab: string
    tabs: unknown[]
    rectanglePicture: unknown | null
    pictureUrl: string
    thumbnailUrl: string
    subscribedStatusRawValue: number
    subscribedAt: string
    ref: string
    isDreamTopic: boolean
    isAnonymous: boolean
    enablePictureComments: boolean
    enablePictureWatermark: boolean
    timeForRank: string
    lastMessagePostTime: string
    createdAt: string
    updatedAt: string
    subscribersTextSuffix: string
    subscribersName: string
    friendsAlsoSubscribe: string
    maintainer: null
    isUserTopicAdmin: boolean
    activitySection: null
    activitySections: unknown[]
    tips: {
      inDraft: string
      inComment: string
    }
    toppingArea: unknown | null
    inShortcuts: boolean
    preferSection: string
    relatedHashtags: unknown[]
    intro: string
    squarePostUpdateTime: string
    subscribersAction: string
    approximateSubscribersCount: string
    subscribersDescription: string
    isCommentForbidden: boolean
    botCount: number
    recentPost: string
    source: string
  }
  pictures: unknown[]
  collected: boolean
  collectTime: unknown | null
  user: {
    id: string
    username: string
    screenName: string
    createdAt: string
    updatedAt: string
    isVerified: boolean
    verifyMessage: string
    briefIntro: string
    avatarImage: {
      thumbnailUrl: string
      smallPicUrl: string
      middlePicUrl: string
      picUrl: string
      format: string
      campaignDecorationUrl: string
    }
    profileImageUrl: string
    statsCount: {
      topicSubscribed: number
      topicCreated: number
      followedCount: number
      followingCount: number
      highlightedPersonalUpdates: number
      liked: number
      respectedCount: number
    }
    isBannedForever: boolean
    isSponsor: boolean
    backgroundImage: {
      picUrl: string
    }
    bio: string
    gender: string
    city: string
    country: string
    province: string
    refRemark: {
      type: string
      refId: string
    }
    following: boolean
  }
  createdAt: string
  isFeatured: boolean
  enablePictureComments: boolean
  repostable: boolean
  rollouts: {
    wmpShare: {
      id: string
      path: string
    }
  }
  scrollingSubtitles: {
    text: string
    type: string
  }[]
  pinned: {
    personalUpdate: boolean
  }
}

export interface PostRequest {
  username: string
  limit: number
  loadMoreKey?: {}
}

export interface PostResponse {
  success: boolean
  data: Post[]
  loadMoreKey?: {
    lastId: string
  }
}

export interface LikedUsersRequest {
  id: string
  limit: number
  loadMoreKey?: string
}

export interface LikedUsersResponse {
  data: User[]
  loadMoreKey: string
}
