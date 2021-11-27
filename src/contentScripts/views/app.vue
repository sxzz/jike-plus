<template>
  <el-config-provider :locale="zhCn">
    <like-button />
  </el-config-provider>
</template>

<script setup lang="ts">
import 'virtual:windi.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import LikeButton from './like-button.vue'
</script>
