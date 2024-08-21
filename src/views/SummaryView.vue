<script setup lang="ts">
import ChartComponent from '@/components/ChartComponent.vue';
import { useQuizStore } from '@/stores/quiz';
// import type { QuizDataStats } from '@/types/types';
import { computed } from 'vue';

const quizStore = useQuizStore();
// const quizStats = computed(() => quizStore.getLatestQuizStats) // as QuizDataStats

</script>

<template>
  <div class="summary">
    <h1>Quiz Summary</h1>
    <h2>Latest quiz results</h2>
    <!-- <div v-if="quizStats.score">
      <p style="font-size: 0.7rem;">Time spend: <span style="font-weight: 600;">{{ quizStats.timeCouter }}</span></p>
      <p style="font-size: 0.7rem;">Score: <span style="font-weight: 600;">{{ quizStats.score }}</span></p>
      <p style="font-size: 0.7rem;">Correct answers in % <span style="font-weight: 600;">{{ quizStats.scorePercentage
          }}</span></p>
      <p style="font-size: 0.7rem;">Most popular category: <span style="font-weight: 600;">{{
        quizStats.mostPopularCategory }}</span></p>
      <p style="font-size: 0.7rem;">Most popular difficulty <span style="font-weight: 600;">{{
        quizStats.mostPopularDifficulty }}</span></p>
      <p style="font-size: 0.7rem;">Most popular type <span style="font-weight: 600;">{{ quizStats.mostPopularType
          }}</span></p>
    </div> -->
    <h2>All quiz statistics</h2>
    <div>
      <ChartComponent />
    </div>
  </div>
</template>

<!-- <style></style> -->
