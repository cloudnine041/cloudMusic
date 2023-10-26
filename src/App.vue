<script setup>
import FooterPlay from './components/FooterPlay.vue'
import { useUserStore } from '@/stores/useUserStore.js'

const userStore = useUserStore()
</script>

<template>
  <RouterView />
  <FooterPlay v-show="userStore.isFooterMusic" />
</template>

<style scoped lang="scss"></style>