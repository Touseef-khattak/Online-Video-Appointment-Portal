import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/store/user";
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/AppLogin.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/AppointmentList.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('@/views/AppointmentForm.vue')
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: () => import('@/views/AppointmentScreen.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to) => {
  const userStore = useUserStore();
  if (userStore.user == null && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
