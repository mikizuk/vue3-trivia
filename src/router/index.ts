import { createRouter, createWebHistory } from 'vue-router'
// import { useQuizStore } from '@/stores/quiz';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue'),
    },
    {
      path: '/summary',
      name: 'summary',
      component: () => import('../views/SummaryView.vue'),
      meta: { requiresData: true }
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  // const quizStore = useQuizStore();
  // if (to.meta.requiresData) {
  //   next({ name: 'home'})
    next()
})

export default router
