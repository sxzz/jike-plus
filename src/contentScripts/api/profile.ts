import { request } from '.'

export const getProfile = async () => {
  const { data: resp } = await request.get<Profile>('users/profile')
  return resp
}

// https://api.ruguoapp.com/1.0/users/profile

export interface AvatarImage {
  thumbnailUrl: string
  smallPicUrl: string
  middlePicUrl: string
  picUrl: string
  format: string
  campaignDecorationUrl: string
}

export interface StatsCount {
  topicSubscribed: number
  topicCreated: number
  followedCount: number
  followingCount: number
  highlightedPersonalUpdates: number
  liked: number
  respectedCount: number
}

export interface BackgroundImage {
  picUrl: string
}

export interface Preferences {
  autoPlayVideo: boolean
  topicTagGuideOn: boolean
  dailyNotificationOn: boolean
  followedNotificationOn: boolean
  subscribeWeatherForecast: boolean
  privateTopicSubscribe: boolean
  undiscoverableByPhoneNumber: boolean
  saveDataUsageMode: boolean
  topicPushSettings: string
  debugLogOn: boolean
  env: string
  syncCommentToPersonalActivity: boolean
  repostWithComment: boolean
  enablePrivateChat: boolean
  blockStrangerPoke: boolean
  enablePictureWatermark: boolean
  enableOperationPush: boolean
  enableChatSound: boolean
  replyNotificationAllowGroup: string
  likeNotificationOn: boolean
  respectNotificationOn: boolean
  mentionNotificationOn: boolean
  openMessageTabOnLaunch: boolean
  tabOnLaunch: string
  hideSubscribeTab?: any
  undiscoverableByWeiboUser?: any
  paidMarket?: any
  followingUpdatesSortBy: string
  liveNotificationOn: boolean
}

export interface WechatUserInfo {
  id: string
  externalName: string
}

export interface School {
  id: string
  name: string
  major: string
  enrollmentYear: number
  privacyType: string
}

export interface RelationshipState {
  id: string
  text: string
}

export interface Medal {
  picUrl: string
  name: string
  gotMedalAt: string
}

export interface ProfileTag {
  picUrl: string
  type: string
  text: string
}

export interface RestrictedAvatarChange {
  nextChangeDate: Date
  limits: number
}

export interface RestrictedNameChange {
  nextChangeDate: string
  limits: number
}

export interface AvatarImage2 {
  thumbnailUrl: string
  smallPicUrl: string
  middlePicUrl: string
  picUrl: string
  format: string
  campaignDecorationUrl: string
}

export interface StatsCount2 {
  topicSubscribed: number
  topicCreated: number
  followedCount: number
  followingCount: number
  highlightedPersonalUpdates: number
  liked: number
  respectedCount: number
}

export interface BackgroundImage2 {
  picUrl: string
}

export interface LatestVisitor {
  id: string
  username: string
  screenName: string
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  verifyMessage: string
  briefIntro: string
  avatarImage: AvatarImage2
  profileImageUrl: string
  statsCount: StatsCount2
  isBannedForever: boolean
  isSponsor: boolean
  backgroundImage: BackgroundImage2
  bio: string
  gender: string
  city: string
  country: string
  province: string
}

export interface ProfileVisitInfo {
  todayCount: number
  latestVisitor: LatestVisitor
}

export interface User {
  id: string
  username: string
  screenName: string
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  verifyMessage: string
  briefIntro: string
  avatarImage: AvatarImage
  profileImageUrl: string
  statsCount: StatsCount
  isBannedForever: boolean
  isSponsor: boolean
  backgroundImage: BackgroundImage
  bio: string
  gender: string
  city: string
  country: string
  province: string
  groupId: string
  preferences: Preferences
  isBetaUser: boolean
  usernameSet: boolean
  wechatOpenId: string
  wechatUnionId: string
  mobilePhoneNumber: string
  areaCode: string
  groupVersion: number
  lastChangeNameTime: Date
  birthday: string
  wechatUserInfo: WechatUserInfo
  topicRoles: any[]
  school: School
  zodiac: string
  industry: string
  relationshipState: RelationshipState
  showRespect: boolean
  medals: Medal[]
  profileTags: ProfileTag[]
  backgroundMaskColor: string
  isLoginUser: boolean
  isBanned: boolean
  userHasPosted: boolean
  registerAppVersion: string
  hasStories: boolean
  restrictedAvatarChange: RestrictedAvatarChange
  restrictedNameChange: RestrictedNameChange
  isDefaultScreenName: boolean
  profileVisitInfo: ProfileVisitInfo
}

export interface TabIcons {
  tab4: string
}

export interface Profile {
  user: User
  enabledFeatures: string[]
  agreedProtocol: string[]
  tabIcons: TabIcons
}
