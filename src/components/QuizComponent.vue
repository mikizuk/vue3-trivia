<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuizStore } from '@/stores/quiz';
import { useRouter } from 'vue-router'
import { convertString } from '@/utils/stringUtils'

const router = useRouter()
const quizStore = useQuizStore()
const isActualQuizFinished = computed(() => quizStore.isActualQuizFinished)
const currentIndex = computed(() => quizStore.getCurrentQuizQuestionIndex)
const quizQuestions = computed(() => quizStore.getQuizQuestions)
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
  if (!isActualQuizFinished.value) {
    if (currentQuestion.value.selectedAnswer === answer) {
      quizStore.resetAnswer(currentIndex.value)
    }
    else {
      quizStore.chooseAnswer(currentIndex.value, answer)
    }
  }
}
const resetQuizClick = () => {
  quizStore.resetActualQuizData();
  router.push('/')
}
const finishQuizClick = () => {
  quizStore.finishQuiz()
}

</script>
<template>
  <div v-if="currentQuestion" class="quiz">
    <div class="quiz__info">
      <label for="progress-bar">Answered questions:</label>
      <progress class="quiz__progress-bar" id="progress-bar" :max="quizQuestions.length"
        :value="numberOfSelectedAnswers"></progress>
      <p>Question: {{ currentIndex + 1 }}/{{ quizQuestions.length }}</p>
    </div>
    <Transition :name="transitionName">
      <div :key="currentQuestion.id" class="quiz__question">
        <div class="quiz__question-info">
          <p>Difficulty: {{ currentQuestion.difficulty }}</p>
          <p>Category: {{ convertString(currentQuestion.category) }}</p>
        </div>
        <strong class="quiz__question-text">{{ convertString(currentQuestion.question)
          }}</strong>
        <ul class="quiz__answer-list">
          <li class="quiz__answer-item" v-for="answer of currentQuestion.randomAnswers" :key="answer"
            @click="selectAnswerClick(answer)" :class="{
              'quiz__answer--selected': currentQuestion.selectedAnswer === answer,
              'quiz__answer--correct': isActualQuizFinished && currentQuestion.correctAnswer === answer,
              'quiz__answer--incorrect': isActualQuizFinished && currentQuestion.incorrectAnswers.find(a => a === answer)
            }">
            <span>{{ convertString(answer) }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
  <div class="quiz__status">
    <div v-if="isActualQuizFinished">
      <p>You finished the quiz! Cool! Check your statistics in <RouterLink to="/summary">Summary page</RouterLink>.
      </p>
    </div>
  </div>
  <div class="button-wrapper">
    <button class="button" @click="previousClick" :disabled="currentIndex === 0">Previous question</button>
    <button class="button" @click="nextClick" :disabled="currentIndex === quizQuestions.length - 1">Next
      question</button>
    <button class="button" @click="resetQuizClick" :disabled="isActualQuizFinished">Reset quiz</button>
    <button class="button" @click="finishQuizClick" :disabled="isActualQuizFinished">Finish quiz</button>
  </div>
</template>

<style>
.quiz {
  text-align: center;
  overflow: hidden;
  width: 100%;
  min-height: 380px;
  height: 100%;
  position: relative;
}

.quiz__info {
  text-align: center;
  padding-bottom: .5rem;
}

.quiz__progress-bar {
  margin-left: 10px;
  border-radius: 10px;
  height: 15px;
  box-shadow: var(--color-progress-bar-shadow);
  transition: 0.4s;
}

.quiz__progress-bar::-webkit-progress-bar {
  background-color: var(--color-text);
  border-radius: 7px;
  transition: 0.4s;
}

.quiz__progress-bar::-webkit-progress-value {
  background-color: var(--color-progress-bar);
  border-radius: 7px;
  transition: 0.4s;
}

.quiz__progress-bar::-moz-progress-bar {
  border-radius: 7px;
  transition: 0.4s;
}

.quiz__question {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
}

.quiz__question-info {
  display: flex;
  justify-content: space-around;
  font-size: small;
}

.quiz__question-text {
  text-align: justify;
  padding-block: .5rem;
  font-weight: 600;
}

.quiz__answer-list {
  padding: 0;
  display: grid;
  gap: .8rem;
  flex-direction: column;
}

.quiz__answer-item {
  list-style: none;
  border: 2px solid var(--color-notselected-option-border);
  border-radius: 10px;
  cursor: pointer;
  padding-block: .1rem;
  min-width: 324px;
}

.quiz__answer--selected {
  border: 2px solid var(--color-selected-option-border);
}

.quiz__answer--correct {
  background-color: var(--color-correct-option-background);
}

.quiz__answer--incorrect {
  background-color: var(--color-incorrect-option-background);
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

.quiz__status {
  padding-block: 0.5rem;
}

@media (min-width: 768px) {
  .quiz__question-info {
    font-size: 1rem;
  }

  .quiz__question-text {
    padding-block: 1rem;
  }
}

@media (min-width: 1024px) {
  .quiz__question-text {
    padding-block: 1.2rem;
  }
}
</style>