<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import QuizComponent from '@/components/QuizComponent.vue'
import { useQuizStore } from '@/stores/quiz';

const quizStore = useQuizStore()
const isQuizCreated = computed(() => quizStore.isQuizCreated)

</script>

<template>
  <h1>Quiz page</h1>
  <div v-if="isQuizCreated">
    <QuizComponent />
  </div>
  <div v-else>
    <p>If no quiz created then show go to <RouterLink to="/">Home page</RouterLink> to create your quiz!</p>
  </div>
</template>
