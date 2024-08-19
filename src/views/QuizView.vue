<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import QuizComponent from '@/components/QuizComponent.vue'
import { useQuizStore } from '@/stores/quiz';

const quizStore = useQuizStore()
const isActualQuizCreated = computed(() => quizStore.isActualQuizCreated)
// const isActualQuizFinished = computed(() => quizStore.isActualQuizFinished)
</script>

<template>
  <h1>Quiz page</h1>
  <div class="actual-quiz" v-if="isActualQuizCreated">
    <QuizComponent />
  </div>
  <div v-else>
    <p>If no quiz created then show go to <RouterLink to="/">Home page</RouterLink> to create your quiz!</p>
  </div>
</template>

<style>
.actual-quiz {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>