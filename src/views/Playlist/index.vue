<script setup>
import { getPlayDetailAPI } from '@/apis/playlist.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TopPlaylist from './components/TopPlaylist.vue'
import PlaySongs from './components/PlaySongs.vue'
const route = useRoute()
const playlist = ref({})
const getPlayDetail = async () => {
  const res = await getPlayDetailAPI(route.params.id)
  playlist.value = res.playlist
}
onMounted(() => getPlayDetail())
</script>

<template>
  <div class="container">
    <TopPlaylist :playlist-info="playlist" />
    <PlaySongs :subscribe="playlist.subscribedCount" />
  </div>
</template>

<style scoped lang="scss">
.container {
  padding-bottom: 0.8rem;
}
</style>
