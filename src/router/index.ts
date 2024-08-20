import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue'
import SummaryView from '../views/SummaryView.vue'
// import { useQuizStore } from '@/stores/quiz';

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
      component: QuizView,
    },
    {
      path: '/summary',
      name: 'summary',
      component: SummaryView,
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
