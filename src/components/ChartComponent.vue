<script setup lang="ts">
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, scales } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = ref({
  labels: ['1st quiz', '2nd quiz', '3rd quiz', '4th quiz'],
  datasets: [
    {
      label: '% of correct answers',
      backgroundColor: '#00bd7e',
      data: [30, 39, 10, 80],
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
        label: function (context) {
          console.log("context:", context);
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += `${context.parsed.y}`;
          }
          return label;
        }
      }
    }
  }
});
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<style scoped>
/* Add any styles for your chart component here */
</style>
