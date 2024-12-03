import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PokeSearchView from '@/views/PokeSearchView.vue'
import FavoriteView from '@/views/FavoriteView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pokesearch',
    name: 'pokesearch',
    component: PokeSearchView
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoriteView
  },
  // {
  //   path: '/pokemon/:id',
  //   name: 'pokemon',
  //   component: AboutView
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
