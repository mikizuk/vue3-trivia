<script setup lang="ts">
import ChartComponent from '@/components/ChartComponent.vue';
import { useQuizStore } from '@/stores/quiz';
import type { QuizItemFinished, QuizTotal } from '@/types/types';
import { computed, type ComputedRef } from 'vue';

const quizStore = useQuizStore();
const totalStats: ComputedRef<QuizTotal> = computed(() => quizStore.getTotalStats)
const allItemsStats: ComputedRef<QuizItemFinished[]> = computed(() => quizStore.getAllItemsStats)
const resultsScore = allItemsStats.value.map(stat => stat.score)
const resultsPercentage = allItemsStats.value.map(stat => stat.scorePercentage)
</script>

<template>
  <div class="summary">
    <h1>Quiz Summary</h1>
    <h2>Statistics of all quizes</h2>
    <div v-if="totalStats?.totalTimeSpend">
      <p style="font-size: 0.7rem;">Time spend: <span style="font-weight: 600;">{{ totalStats.totalTimeSpend }}</span>
      </p>
      <p style="font-size: 0.7rem;">Score: <span style="font-weight: 600;">{{ totalStats.totalScore }}</span></p>
      <p style="font-size: 0.7rem;">Correct answers: <span style="font-weight: 600;">{{
        totalStats.totalScorePercentage
          }}%</span></p>
      <p style="font-size: 0.7rem;">Most popular category: <span style="font-weight: 600;">{{
        totalStats.totalMostPopularCategory }}</span></p>
      <p style="font-size: 0.7rem;">Most popular difficulty <span style="font-weight: 600;">{{
        totalStats.totalMostPopularDifficulty }}</span></p>
      <p style="font-size: 0.7rem;">Most popular type <span style="font-weight: 600;">{{ totalStats.totalMostPopularType
          }}</span></p>
    </div>
    <div v-if="resultsScore">
      <ChartComponent :resultsScore :resultsPercentage />
    </div>
  </div>
</template>
