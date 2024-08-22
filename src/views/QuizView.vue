<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import QuizComponent from '@/components/QuizComponent.vue'
import { useQuizStore } from '@/stores/quiz';

const quizStore = useQuizStore()
const isActualQuizCreated = computed(() => quizStore.isActualQuizCreated)
</script>

<template>
  <h1>Quiz page</h1>
  <div class="quiz-component-wrapper" v-if="isActualQuizCreated">
    <QuizComponent />
  </div>
  <div v-else>
    <p>If no quiz created then show go to <RouterLink to="/">Home page</RouterLink> to create your quiz!</p>
  </div>
</template>

<style>
.quiz-component-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-block: 1rem;
}

@media (min-width: 768px) {
  .quiz-component-wrapper {
    min-width: 500px;
    padding-block: 2rem;
  }
}

@media (min-width: 1024px) {
  .quiz-component-wrapper {
    padding-block: 2.2rem;
  }
}
</style>