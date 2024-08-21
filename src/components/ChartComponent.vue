<script setup lang="ts">
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

const props = defineProps<{
  resultsScore: number[],
  resultsPercentage: number[],
}>()

const resultsLabel = computed(() => {
  return props.resultsScore.map((res, index) => `Quiz: ${index + 1}, score: ${res}`)
})
const resultsRef = ref(props.resultsPercentage)

const chartData = ref({
  labels: resultsLabel,
  datasets: [
    {
      label: '% of correct answers',
      backgroundColor: '#00bd7e',
      data: resultsRef.value,
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  scales: {
    x: {
      max: 100
    }
  },
  indexAxis: 'y',
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return `${context?.dataset?.label || 'label'}: ${context?.formattedValue || 'value'}`;
        }
      }
    }
  }
});

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
