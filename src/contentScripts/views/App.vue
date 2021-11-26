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

<script setup lang="ts">
import 'virtual:windi.css'
import { ElLoading } from 'element-plus'
import { getLikedUsers, getPostsByUsername } from '../api/post'
import { getProfile } from '../api/user'
import LikeRank from './like-rank.vue'
import type { User } from '../api/user'

const visible = ref(false)
const rank = ref<{ user: User; count: number }[]>([])

const handleLikeRank = async () => {
  const loading = ElLoading.service({ text: '获取中...', body: true })
  try {
    const profile = await getProfile()
    const username = profile.user.username

    const posts = await getPostsByUsername(username, 10000)
    loading.setText(`获取到 ${posts.length} 个动态`)

    const likes: Record<string, number> = {}
    const usersInfo: Record<string, User> = {}

    for (const [index, post] of posts.entries()) {
      loading.setText(`获取中... (${index + 1} / ${posts.length})`)
      const users = await getLikedUsers(post.id, 100).catch((err: any) => {
        if (err.response.status === 400) {
          // 请求错误
          console.warn(post)
          return null
        }
        console.error(err.response)
        return null
      })
      if (!users) continue

      for (const user of users) {
        usersInfo[user.username] = user
        if (likes[user.username] === undefined) {
          likes[user.username] = 1
        } else {
          likes[user.username]++
        }
      }
    }

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
