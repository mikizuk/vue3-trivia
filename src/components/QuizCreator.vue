<script setup lang="ts">
import { reactive, computed } from "vue";
import { categories, difficulties, types, encodes } from "@/config/opentdb";
import type { ApiSetup } from "@/types/types";
import { MAX_QUESTIONS, MIN_QUESTIONS } from "@/service/triviaApi";
import { storeToRefs } from 'pinia'
import { useQuizStore } from '@/stores/quiz';
import { convertString } from '@/utils/stringUtils'

const quizStore = useQuizStore()
const { quizSetup } = storeToRefs(quizStore)
const emit = defineEmits(["createQuiz"])

const qSetup: ApiSetup = reactive(quizSetup.value)
const isButtonDisabled = computed(() => {
  return qSetup.numberOfQuestions > MAX_QUESTIONS || qSetup.numberOfQuestions < MIN_QUESTIONS;
});
</script>

<template>
  <form @submit.prevent="emit('createQuiz', qSetup)" class="quiz-creator">
    <h2>Please create you quiz:</h2>
    <div class="form-grid">
      <label class="form-label" for="form-questions">Number of questions: *</label>
      <input class="form-input" name="form-questions" id="form-questions" v-model.number="qSetup.numberOfQuestions"
        type="number" :min="MIN_QUESTIONS" :max="MAX_QUESTIONS" />
      <p class="form-info">* minimum number of questions is {{ MIN_QUESTIONS }} and maximum is {{ MAX_QUESTIONS }}</p>
      <label class="form-label" for="form-category">Select category:</label>
      <select class="form-input" name="form-category" id="form-category" v-model="qSetup.selectedCategoryValue">
        <option v-for="category of categories" :key="category.value"
          :selected="category.value === qSetup.selectedCategoryValue" :value="category.value">
          {{ convertString(category.text) }}
        </option>
      </select>
      <label class="form-label" for="form-difficulty">Select difficulty:</label>
      <select class="form-input" name="form-difficulty" id="form-difficulty" v-model="qSetup.selectedDifficultyValue">
        <option v-for="difficulty of difficulties" :key="difficulty.value"
          :selected="difficulty.value === qSetup.selectedDifficultyValue" :value="difficulty.value">
          {{ difficulty.text }}
        </option>
      </select>
      <label class="form-label" for="form-type">Select type:</label>
      <select class="form-input" name="form-type" id="form-type" v-model="qSetup.selectedTypeValue">
        <option v-for="type of types" :key="type.value" :selected="type.value === qSetup.selectedTypeValue"
          :value="type.value">
          {{ type.text }}
        </option>
      </select>
      <label class="form-label" for="form-encoding">Select encoding: **</label>
      <select class="form-input" name="form-encoding" id="form-encoding" v-model="qSetup.selectedEncodeValue" disabled>
        <option v-for="encode of encodes" :key="encode.value" :selected="encode.value === qSetup.selectedEncodeValue"
          :value="encode.value">
          {{ encode.text }}
        </option>
      </select>
      <p class="form-info">** Selection enabled in paid version</p>
    </div>
    <div class="button-wrapper">
      <button class="button" :disabled=isButtonDisabled type="submit">Create Quiz</button>
    </div>
  </form>
  <div>
  </div>
</template>

<style>
.quiz-creator {
  padding-block: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 170px;
  gap: 8px;
  margin-block: 1rem;
}

.form-info {
  font-size: small;
  grid-column: 1 / 3;
}
</style>