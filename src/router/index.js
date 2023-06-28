import { createRouter, createWebHistory } from 'vue-router'
import MainTodo from '../pages/MainTodo.vue'

const routes = [
  {
    path: '/',
    name: 'Top',
    component: MainTodo,
  },
  {
    path: '/mainTodo',
    name: 'MainTodo',
    component: MainTodo,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
  },
  {
    path: '/blog/',
    name: 'Blog',
    component: () => import('../pages/Blog.vue'),
  },
  {
    path: '/blog/:id',
    name: 'BlogDtl',
    component: () => import('../pages/BlogDtl.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
