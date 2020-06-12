import {defineAsyncComponent} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/home.vue'
import Playground from '../views/playground.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/playground/:msg',
    props: true,
    component: Playground,
  },
  {
    path: '/players-chart',
    component: defineAsyncComponent(() => import('../views/players-chart.vue')),
    meta: {
      layout: 'fullpage',
    },
  },
  {
    path: '/banned-list',
    component: defineAsyncComponent(() => import('../views/banned-list.vue')),
    meta: {
      layout: 'fullpage',
    },
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
