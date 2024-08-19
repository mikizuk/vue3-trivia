import { defineStore } from 'pinia';
import { fetchQuestions } from '@/service/triviaApi';
import type { ApiResponse, ApiSetup, ApiResponseData, QuestionData, QuizData, /* QuizStats, */ QuizState } from "@/types/types";
import { shuffleItems } from '@/utils/array';

const initialQuizSetup: ApiSetup = {
  numberOfQuestions: 2, // 3,
  selectedCategoryValue: 0,
  selectedDifficultyValue: "any",
  selectedTypeValue: "any",
  selectedEncodeValue: "default",
}

const initialQuizResponse: ApiResponse = {
  data: {},
  error: null,
}

const initialQuizData: QuizData = {
  // questionData are to be merged with correctAnswer & incorrectAnswers from ApiResponseData
  questionData: [],
  score: 0,
  time: 0,
  currentQuestionIndex: 0,
  isFinished: false // TODO check true
}

// const initialQuizStats: QuizStats = {
//   scorePercentage: 0,
//   mostPopularDifficulty: null,
//   mostPopularType: null,
// }

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    quizSetup: initialQuizSetup,
    quizResponse: initialQuizResponse,
    loading: false,
    actualQuiz: initialQuizData,
    // quizStats: new Map<number, QuizData>(),
  }),

  getters: {
    isLoading: (state) => state.loading,
    isResponseError: (state) => state.quizResponse.error !== null,
    getResponseError: (state) => state.quizResponse.error,
    getQuizResponse: (state) => state.quizResponse,
    //
    isActualQuizCreated: (state) => !!state.actualQuiz.questionData.length,
    isActualQuizFinished: (state) => state.actualQuiz.isFinished,
    // isActualQuizCreatedAndFinished: (state) => state.isActualQuizCreated && state.isActualQuizFinished,
    getCurrentQuizQuestionIndex: (state) => state.actualQuiz.currentQuestionIndex,
    getQuizQuestions: (state) => state.actualQuiz.questionData,
    //
    numberOfSelectedAnswers: (state) => state.actualQuiz.questionData.filter(q => q.selectedAnswer).length,
    // getCurrentQuestion: (state) => state.actualQuiz.questionData[state.actualQuiz.currentQuestionIndex],
    // allQuestions: (state) => state.questions,
    // currentQuestion: (state) => state.questions[state.currentQuestionIndex],
    // progress: (state) => (state.currentQuestionIndex + 1) / state.questions.length * 100,
    // isQuizComplete: (state) => state.currentQuestionIndex >= state.questions.length,
  },

  actions: {
    async loadQuestions(setupData: ApiSetup) {
      this.resetQuizResponse();
      this.loading = true;
      
      try {
        this.quizResponse = await fetchQuestions(setupData)
      } finally {
        this.loading = false;
        if (this.quizResponse?.data) {
          this.prepareQuiz(this.quizResponse.data as ApiResponseData[])
        }
      }
    },
    prepareQuiz(data: ApiResponseData[]) {
      this.resetActualQuizData()
      const questionData: QuestionData[] = data.map((dataItem: ApiResponseData, index: number) => ({
          ...dataItem,
          id: index,
          randomAnswers: shuffleItems([dataItem.correctAnswer, ...dataItem.incorrectAnswers]),
          selectedAnswer: null
      }))

      this.actualQuiz = {
        ...this.actualQuiz,
        questionData
      }
    },
    checkIfQuizHasAllAnswers() {
      return this.numberOfSelectedAnswers < this.actualQuiz.questionData.length
    },
    resetAnswer(index: number) {
      this.actualQuiz.questionData[index].selectedAnswer =  null;
      // TODO: check if all answers selected
    },
    chooseAnswer(index: number, answer: string) {
      this.actualQuiz.questionData[index].selectedAnswer = answer;
      // this.checkIsQuizFinished()
    },
    goToNextQuestion() {
      if (this.actualQuiz.currentQuestionIndex < this.actualQuiz.questionData.length - 1) {
        this.actualQuiz.currentQuestionIndex++;
      }
    },
    goToPreviousQuestion() {
      if (this.actualQuiz.currentQuestionIndex > 0) {
        this.actualQuiz.currentQuestionIndex--;
      }
    },
    resetQuizResponse() {
      this.quizResponse = initialQuizResponse;
    },
    resetActualQuizData() {
      this.actualQuiz = initialQuizData;
    },
    finishQuiz() {
      console.info('FINISH QUIZ!', );
      this.actualQuiz.isFinished = true;
      // this.colour wrong and correct answers
      this.prepareStats() 
      // this.resetActualQuizData()
    },
    prepareStats() {
      console.info('PREPARE STATS! this.actualQuiz', this.actualQuiz);
      // TODO: check correct answer
      
    },
  },
});
