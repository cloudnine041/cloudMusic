import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserAPI } from '@/apis/user.js'

export const useUserStore = defineStore('userStore', () => {
  const isFooterMusic = ref(false)
  const isLogin = ref(false)

  const changeFooterMusic = (val) => isFooterMusic.value = val

  const getUser = async (ph, pa) => {
    const res = await getUserAPI(ph, pa)
  }
  return {
    isFooterMusic,
    isLogin,
    changeFooterMusic,
    getUser
  }
})
