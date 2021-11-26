<template>
  <el-dialog
    :model-value="modelValue"
    width="400px"
    center
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #title>
      <span>
        <icon-park-outline:thumbs-up
          class="block m-auto text-[#ffe411] inline"
        />
        点赞排行榜
      </span>
    </template>
    <el-space class="rank w-full" direction="vertical" fill>
      <div
        v-for="item in data"
        :key="item.user.username"
        class="flex justify-between items-center"
      >
        <a
          class="flex items-center min-w-0"
          :href="`https://web.okjike.com/u/${item.user.username}`"
          target="_blank"
        >
          <span class="mr-2 text-2xl w-8">
            <template v-if="getRanking(item.count) === 1">🏅️</template>
            <template v-else-if="getRanking(item.count) === 2">🥈</template>
            <template v-else-if="getRanking(item.count) === 3">🥉</template>
            <div v-else></div>
          </span>
          <el-avatar
            class="mr-2 shadow min-w-8 min-h-8"
            :src="item.user.avatarImage.picUrl"
          />
          <span
            class="overflow-ellipsis overflow-hidden whitespace-nowrap min-w-0"
          >
            {{ item.user.screenName }}
          </span>
        </a>
        <span class="flex justify-center items-center">
          <icon-park-outline:thumbs-up
            class="block m-auto text-[#ffe411] inline mr-1"
          />
          {{ item.count }}
        </span>
      </div>
    </el-space>
  </el-dialog>
</template>

<script setup lang="ts">
import type { User } from '../api/user'

// eslint-disable-next-line vue/no-setup-props-destructure
const { data } = defineProps<{
  modelValue: boolean
  data: { user: User; count: number }[]
}>()
defineEmits<{
  (event: 'update:model-value', value: boolean): void
}>()

const ranking = computed(() => [...new Set(data.map((item) => item.count))])

const getRanking = (count: number) => ranking.value.indexOf(count) + 1
</script>
