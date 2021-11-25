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
        <mdi:thumb-up-outline class="block m-auto text-black text-lg" />
      </div>
    </el-tooltip>
  </div>

  <el-dialog v-model="visible" width="400px" center>
    <template #title>
      <span>
        <mdi:thumb-up-outline class="block m-auto text-[#ffe411] inline" />
        点赞排名
      </span>
    </template>
    <el-space class="rank w-full" direction="vertical" fill>
      <div
        v-for="item in rank"
        :key="item.username"
        class="flex justify-between items-center"
      >
        <a
          class="flex items-center min-w-0"
          :href="`https://web.okjike.com/u/${item.username}`"
          target="_blank"
        >
          <el-avatar
            class="mr-2 shadow min-w-8 min-h-8"
            :src="usersInfo[item.username].avatarImage.picUrl"
          />
          <span
            class="overflow-ellipsis overflow-hidden whitespace-nowrap min-w-0"
          >
            {{ usersInfo[item.username].screenName }}
          </span>
        </a>
        <span class="flex justify-center items-center">
          <mdi:thumb-up-outline
            class="block m-auto text-[#ffe411] inline mr-1"
          />
          {{ item.count }}
        </span>
      </div>
    </el-space>
  </el-dialog>
</template>

<script setup lang="ts">
import 'virtual:windi.css'
import { ElLoading } from 'element-plus'
import { getLikedUsers, getPostsByUsername } from '../api/post'
import { getProfile } from '../api/profile'
import type { User } from '../types'

const visible = ref(false)
const rank = ref<{ username: string; count: number }[]>([])
const usersInfo = ref<Record<string, User>>({})

const handleLikeRank = async () => {
  const loading = ElLoading.service({ text: '获取中...', body: true })
  try {
    const profile = await getProfile()
    const username = profile.user.username

    const posts = await getPostsByUsername(username, 10000)
    loading.setText(`获取到 ${posts.length} 个动态`)

    const likes: Record<string, number> = {}

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
        usersInfo.value[user.username] = user
        if (likes[user.username] === undefined) {
          likes[user.username] = 1
        } else {
          likes[user.username]++
        }
      }
    }

    rank.value = Object.entries(likes)
      .map(([name, count]) => ({
        username: name,
        count,
      }))
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
