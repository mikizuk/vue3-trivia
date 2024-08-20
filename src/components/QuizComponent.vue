<script setup lang="ts">
import { ref, computed } from 'vue'
// import { storeToRefs } from 'pinia'
import { useQuizStore } from '@/stores/quiz';
import { useRouter } from 'vue-router'
import { convertString } from '@/utils/string'

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
    console.info('currentQuestion.value:', currentQuestion.value);
  }
}
const resetQuizClick = () => {
  quizStore.resetActualQuizData();
  router.push('/')
}
const finishQuizClick = () => {
  quizStore.finishQuiz()
  showCorrectAnswers()
  // router.push('/summary')
}

const showCorrectAnswers = () => {
  console.info('showAnswers!', quizQuestions.value);
}

</script>
<template>
  <div class="quiz-component">
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
          <div style="display: flex; justify-content: space-around;">
            <p><span style="font-size: small;">Difficulty:</span> {{ currentQuestion.difficulty }}</p>
            <p><span style="font-size: small;">Category:</span> {{ convertString(currentQuestion.category) }}</p>
          </div>
          <strong style="padding-block: .5rem; t: 600;">{{ convertString(currentQuestion.question) }}</strong>
          <!-- style="padding-block: 1rem; font-weight: 600;" -->
          <ul style="padding: 0; margin-inline: 1rem;">
            <li class="quiz-answer" v-for="answer of currentQuestion.randomAnswers" :key="answer"
              @click="selectAnswerClick(answer)" :class="{
                'quiz-answer--selected': currentQuestion.selectedAnswer === answer,
                'quiz-answer--correct': isActualQuizFinished && currentQuestion.correctAnswer === answer,
                'quiz-answer--incorrect': isActualQuizFinished && currentQuestion.incorrectAnswers.find(a => a === answer)
              }">
              <span>{{ convertString(answer) }}</span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
  <div class="quiz-status">
    <div v-if="isActualQuizFinished">
      <p>You finished the quiz! Cool! Check your statistics in <RouterLink to="/summary">Summary page</RouterLink>.
      </p>
      <!-- <div style="display: flex; justify-content: space-around;">
        <p class="quiz-answer quiz-answer--selected quiz-answer--hint">Selected answer</p>
        <p class="quiz-answer quiz-answer--selected quiz-answer--correct quiz-answer--hint">Correct answer!!</p>
        <p class="quiz-answer quiz-answer--selected quiz-answer--incorrect quiz-answer--hint">Incorrect answer</p>
      </div> -->
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
.quiz-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
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
  /* min-height: 55vh; */
  min-height: 380px;
  height: 100%;
  position: relative;
  /* border: 1px solid blue; */
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
  /* border: 1px solid red; */
  /* top: 60%; */
}

.quiz-answer {
  list-style: none;
  border: 2px solid lightgrey;
  border-radius: 10px;
  margin-block: .8rem;
  cursor: pointer;
  /* max-width: 400px; */
}

.quiz-answer--hint {
  font-size: .8rem;
  text-align: center;
  /* width: 150px; */
  padding-inline: 8px;
  /* margin-block: 5px; */
}

.quiz-answer--selected {
  border: 2px solid var(--color-selected-option-border);
}

.quiz-answer--correct {
  background-color: var(--color-correct-option-background);
}

.quiz-answer--incorrect {
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
</style>