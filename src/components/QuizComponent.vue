<script setup lang="ts">
import { ref, computed } from 'vue'
// import { storeToRefs } from 'pinia'
import { useQuizStore } from '@/stores/quiz';
import { useRouter } from 'vue-router'
import { convertString } from '@/utils/string'

const router = useRouter()
const quizStore = useQuizStore()
const isQuizFinished = computed(() => quizStore.isActualQuizFinished)
const currentIndex = computed(() => quizStore.getCurrentQuizQuestionIndex)
const quizQuestions = computed(() => quizStore.getQuizQuestions)
const isFinishButtonDisabled = computed(() => numberOfSelectedAnswers.value < quizQuestions.value.length)
const numberOfSelectedAnswers = computed(() => quizStore.numberOfSelectedAnswers);
const currentQuestion = computed(() => quizQuestions.value[currentIndex.value]);

const direction = ref('next')
const transitionName = computed(() => direction.value === 'next' ? 'slide-right' : 'slide-left');

const nextClick = () => {
  direction.value = 'next';
  quizStore.goToNextQuestion()
};

const previousClick = () => {
  direction.value = 'prev';
  quizStore.goToPreviousQuestion()
};

const selectAnswerClick = (answer: string) => {
  if (currentQuestion.value.selectedAnswer === answer) {
    quizStore.resetAnswer(currentIndex.value)
  }
  else {
    quizStore.chooseAnswer(currentIndex.value, answer)
  }
}

const resetQuizClick = () => {
  quizStore.resetActualQuizData();
  router.push('/')
}
const finishQuizClick = () => {
  // router.push('/summary')
}

</script>
<template>
  <div v-if="isQuizFinished">
    <p>This quiz is finished!</p>
    <p>go back to home & create new one or</p>
    <p>go to summary page to see your statistics!</p>
  </div>
  <div v-else class="quiz-component">
    <div v-if="currentQuestion" class="quiz-question">
      <div class="quiz-info">
        <div>
          <label for="progress-bar">Answered questions:</label>
          <progress class="progress-bar" id="progress-bar" :max="quizQuestions.length"
            :value="numberOfSelectedAnswers"></progress>
        </div>
        <p>Question: {{ currentIndex + 1 }}/{{ quizQuestions.length }}</p>
      </div>
      <Transition :name="transitionName">
        <div :key="currentQuestion.id" class="quiz-item">
          <!-- <div style="display: flex; justify-content: space-around; padding-block: 1rem;"> -->
          <p><span style="">Difficulty:</span> {{ currentQuestion.difficulty }}</p>
          <p><span style="">Category:</span> {{ convertString(currentQuestion.category) }}</p>
          <!-- </div> -->
          <p style="padding-block: 1rem; font-weight: 600;">{{ convertString(currentQuestion.question) }}</p>
          <ul style="padding-block: 1rem">
            <!-- @click="() => currentQuestion.selectedAnswer = answer" -->
            <li class="quiz-answer" v-for="answer of currentQuestion.randomAnswers" :key="answer"
              @click="selectAnswerClick(answer)" :class="{ selected: currentQuestion.selectedAnswer === answer }">
              <span>{{ convertString(answer) }}</span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
  <div class="button-wrapper">
    <button class="button" @click="previousClick" :disabled="currentIndex === 0">Previous question</button>
    <button class="button" @click="nextClick" :disabled="currentIndex === quizQuestions.length - 1">Next
      question</button>
    <button class="button" @click="resetQuizClick">Reset quiz</button>
    <button class="button" @click="finishQuizClick" :disabled="isFinishButtonDisabled">Finish quiz</button>
  </div>
</template>

<style>
.quiz-component {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-bar {
  margin-left: 4px;
  border-radius: 7px;
  height: 12px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.progress-bar::-webkit-progress-bar {
  background-color: var(--color-text);
  border-radius: 7px;
}

.progress-bar::-webkit-progress-value {
  background-color: var(--color-progress-bar);
  border-radius: 7px;
}

.progress-bar::-moz-progress-bar {
  border-radius: 7px;
}

.quiz-question {
  text-align: center;
  overflow: hidden;
  /* max-width: 400px; */
  width: 100%;
  min-height: 40vh;
  /* min-height: 500px; */
  /* height: 100%; */
  position: relative;
}

.quiz-item {
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* white-space: nowrap; */
  position: absolute;
}

.quiz-answer {
  list-style: none;
  border: 2px solid lightgrey;
  border-radius: 10px;
  margin-block: .8rem;
  cursor: pointer;
  /* max-width: 400px; */
}

.quiz-answer.selected {
  border: 2px solid var(--color-selected-border);
  /* background-color: var(--vt-c-divider-light-1); */
}

/* Slide right animation */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(-100%);
}

/* Slide left animation */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(100%);
}
</style>