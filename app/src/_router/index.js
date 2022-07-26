import { createRouter, createWebHistory } from 'vue-router'
import SessionsView from '../routes/SessionsView.vue'
import SessionView from '../routes/SessionView.vue'

const routes = [
  {
    path: '/',
    name: 'sessions',
    component: SessionsView
  },
  {
    path: '/session/:sessionId',
    name: 'session',
    component: SessionView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
