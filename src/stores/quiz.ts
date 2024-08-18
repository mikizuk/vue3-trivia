import { defineStore } from 'pinia';
import { fetchQuestions } from '@/service/triviaApi';
import type { QuizResponse, QuizSetup, QuizState } from "@/types/types";

const initialQuizResponse: QuizResponse = {
  data: {},
  error: null,
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    quizSetup:<QuizSetup> {
      numberOfQuestions: 3,
      selectedCategoryValue: 0,
      selectedDifficultyValue: "any",
      selectedTypeValue: "any",
      selectedEncodeValue: "default",
    },
    quizResponse: initialQuizResponse,
    loading: false,
    // ////
    // questions: [],
    // currentQuestionIndex: 0,
    // answers: [],
  }),

  getters: {
    isLoading: (state) => state.loading,
    isResponseError: (state) => state.quizResponse.error !== null,
    getResponseError: (state) => state.quizResponse.error,
    getQuizResponse: (state) => state.quizResponse,
    // allQuestions: (state) => state.questions,
    // currentQuestion: (state) => state.questions[state.currentQuestionIndex],
    // progress: (state) => (state.currentQuestionIndex + 1) / state.questions.length * 100,
    // isQuizComplete: (state) => state.currentQuestionIndex >= state.questions.length,
  },

  actions: {
    async loadQuestions(quizData: QuizSetup) {
      this.resetQuizResponse();
      this.loading = true;
      
      try {
        this.quizResponse = await fetchQuestions(quizData)
        console.info('loadQuestions..... 1:', 'this.quizResponse:', this.quizResponse);
      } finally {
        this.loading = false;
        console.info('loadQuestions..... 2:', 'this.quizResponse:', this.quizResponse);
        // console.info('loadQuestions.....:', 'quizData', quizData, 'this.quizResponse:', this.quizResponse);
      }
    },
    // setAnswer(index: number, answer: string) {
    //   this.answers[index] = answer;
    // },
    // nextQuestion() {
    //   if (this.currentQuestionIndex < this.questions.length - 1) {
    //     this.currentQuestionIndex++;
    //   }
    // },
    // prevQuestion() {
    //   if (this.currentQuestionIndex > 0) {
    //     this.currentQuestionIndex--;
    //   }
    // },
    resetQuizResponse() {
      this.quizResponse = initialQuizResponse;
    },
    // resetQuiz() {
    //   this.currentQuestionIndex = 0;
    //   this.answers = [];
    // },
  },
});
