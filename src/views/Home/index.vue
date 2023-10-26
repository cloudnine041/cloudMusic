<script setup>
import TopNav from './components/TopNav.vue'
import TopSwipe from './components/TopSwipe.vue'
import IconList from './components/IconList.vue'
import MusicList from './components/MusicList.vue'
</script>

<template>
  <div class="wrapper">
    <TopNav />
    <TopSwipe />
    <IconList />
    <MusicList />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: .1rem .2rem;
}
</style>
