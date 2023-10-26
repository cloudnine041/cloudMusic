import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore.js'
import Home from '@/views/Home/index.vue'
import Playlist from '@/views/Playlist/index.vue'
import Search from '@/views/Search/index.vue'
import Login from '@/views/Login/index.vue'
import UserInfo from '@/views/UserInfo/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/playlist/:id',
      component: Playlist
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/userinfo',
      component: UserInfo,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        if (userStore.isLogin) {
          next()
        } else {
          next('/login')
        }
      }
    },
  ]
})
router.beforeEach((to, from) => {
  const userStore = useUserStore()

  if (to.path === '/login') {
    userStore.changeFooterMusic(false)
  } else {
    userStore.changeFooterMusic(true)
  }
})

export default router
