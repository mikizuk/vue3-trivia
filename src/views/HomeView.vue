<script setup lang="ts">
import { computed } from "vue";
// import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import QuizCreator from '@/components/QuizCreator.vue';
import type { ApiSetup } from "@/types/types";
import { useQuizStore } from '@/stores/quiz';

const router = useRouter();
const quizStore = useQuizStore();

const isActualQuizCreated = computed(() => quizStore.isActualQuizCreated)
const isActualQuizFinished = computed(() => quizStore.isActualQuizFinished)
const isLoading = computed(() => quizStore.isLoading)
const isError = computed(() => quizStore.isResponseError)
const showErrorText = computed(() => quizStore.getResponseError)

const createQuiz = async (quizSetup: ApiSetup): Promise<void> => {
  quizStore.resetActualQuizData();
  await quizStore.loadQuestions(quizSetup)

  if (isError.value === false) {
    router.push('/quiz')
  }
}
</script>

<template>
  <h1>Welcome to Trivia quiz</h1>
  <p>This Quiz is made with: <a href="https://opentdb.com/api_config.php" target="_blank">Trivia API</a>.</p>
  <p>Repository for this app: <a href="https://github.com/mikizuk/vue3-trivia" target="_blank">vue3-trivia</a></p>
  <div v-if="!isActualQuizCreated || (isActualQuizCreated && isActualQuizFinished)">
    <QuizCreator @createQuiz="createQuiz" />
  </div>
  <div v-else>
    <p>If is already created then show go to <RouterLink to="/quiz">Quiz page</RouterLink> to finish your quiz!</p>
  </div>
  <div v-if="isLoading">Loading....</div>
  <div class="error" v-if="isError">Error has occured: {{ showErrorText }}. Please try again a in few seconds.</div>
</template>
