<template>
  <div
    class="
      fixed
      right-2
      bottom-2
      m-5
      z-1000
      flex
      font-sans
      select-none
      leading-1em
    "
  >
    <el-tooltip content="点赞排行榜" placement="top" :visible-arrow="false">
      <div
        class="flex w-10 h-10 rounded-full shadow cursor-pointer bg-[#ffe411]"
        @click="handleLikeRank"
      >
        <icon-park-outline:thumbs-up class="block m-auto text-black text-lg" />
      </div>
    </el-tooltip>
  </div>

  <like-rank v-model="visible" :data="rank" />
</template>

<script lang="ts" setup>
import { ElLoading, ElMessageBox } from 'element-plus'
import { getLikedUsers, getPostsByUsername } from '../api/post'
import { getProfile } from '../api/user'
import QuestionMark from '../../components/question-mark.vue'
import LikeRank from './like-rank.vue'
import type { MessageBoxInputData } from 'element-plus'
import type { User } from '../api/user'

const visible = ref(false)
const rank = ref<{ user: User; count: number }[]>([])

const handleLikeRank = async () => {
  const { value: limit } = (await ElMessageBox.prompt(
    '你要获取最新多少条动态下的点赞？',
    'Jike Plus',
    {
      icon: markRaw(QuestionMark),
      inputValue: '10000',
      inputType: 'number',
    }
  )) as MessageBoxInputData

  const loading = ElLoading.service({ text: '获取中...', body: true })
  try {
    const profile = await getProfile()
    const { username } = profile.user

    const posts = await getPostsByUsername(username, +limit)
    loading.setText(`获取到 ${posts.length} 个动态`)

    const likes: Record<string, number> = {}
    const usersInfo: Record<string, User> = {}
    let success = 0

    const updateLoadingText = () =>
      loading.setText(`获取中... (${success} / ${posts.length})`)

    await Promise.all(
      posts.map(async (post) => {
        const users = await getLikedUsers(post.type, post.id, 10000).catch(
          (err: any) => {
            if (err.response.status === 400) {
              // 请求错误
              console.warn(post)
              return null
            }
            console.error(err.response)
            return null
          }
        )
        if (!users) return

        for (const user of users) {
          usersInfo[user.username] = user
          if (likes[user.username] === undefined) {
            likes[user.username] = 1
          } else {
            likes[user.username]++
          }
        }
        success++
        updateLoadingText()
      })
    )

    rank.value = Object.entries(likes)
      .map(([username, count]) => ({ user: usersInfo[username], count }))
      .sort((a, b) => b.count - a.count)
    visible.value = true
  } finally {
    loading.close()
  }
}
</script>

<style scoped>
.rank :deep(.el-space__item) {
  max-width: 100%;
}
</style>
