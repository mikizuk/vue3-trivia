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
  <h1>Quiz Summary</h1>
  <h2>Statistics of all quizes</h2>
  <div v-if="totalStats?.totalTimeSpend" class="summary">
    <span>Time spend:</span><span class="summary__stat-item">{{ totalStats.totalTimeSpendFormatted }}</span>
    <span>Score:</span><span class="summary__stat-item">{{ totalStats.totalScore }}</span>
    <span>Correct answers:</span><span class="summary__stat-item">{{ totalStats.totalScorePercentage }}%</span>
    <span>Most popular category:</span><span class="summary__stat-item">{{ totalStats.totalMostPopularCategory }}</span>
    <span>Most popular difficulty</span><span class="summary__stat-item">{{ totalStats.totalMostPopularDifficulty
      }}</span>
    <span>Most popular type</span><span class="summary__stat-item">{{ totalStats.totalMostPopularType }}</span>
  </div>
  <div v-if="resultsScore" class="summary-chart">
    <ChartComponent :resultsScore :resultsPercentage />
  </div>
  <p>Go ahead <RouterLink to="/">finish more quizes</RouterLink> to see more results!</p>

</template>

<style scoped>
.summary {
  font-size: .8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-block: .5rem;
}

.summary__stat-item {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-chart {
  padding-block: .5rem;
}

@media (min-width: 768px) {
  .summary {
    font-size: 1rem;
    padding-block: 2rem;
  }

  .summary-chart {
    padding-block: 2rem;
  }

}
</style>
