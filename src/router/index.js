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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
