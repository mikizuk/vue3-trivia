import { defineStore } from 'pinia';
import { fetchQuestions } from '@/service/triviaApi';
import { shuffleItems } from '@/utils/arrayUtils';
import { getTimeNow, formatDuration, calculateTimeSpend } from "@/utils/dateUtils";
import {
  calculateScore,
  calculateScorePercentage,
  calculateTheMostPopularCategory,
  calculateTheMostPopularType,
  calculateMostPopularDifficulty,
  mergeQuestionsDataReduce,
  getSumOf,
  getAverageOf,
} from "@/utils/arrayUtils";
import type {
  ApiResponse,
  ApiSetup,
  ApiResponseData,
  QuestionData,
  QuizItemStarted,
  QuizItemFinished,
  // QuizTotal,
  QuizDataStats,
  QuizState
} from "@/types/types";

const initialQuizSetup: ApiSetup = {
  numberOfQuestions: 3,
  selectedCategoryValue: 0,
  selectedDifficultyValue: "any",
  selectedTypeValue: "any",
  selectedEncodeValue: "default",
}

const initialQuizResponse: ApiResponse = {
  data: {},
  error: null,
}

const initialQuizData: QuizItemStarted = {
  // questionsData are to be merged with correctAnswer & incorrectAnswers from ApiResponseData
  questionsData: [],
  timeCouter: 0,
  currentQuestionIndex: 0,
  isFinished: false // TODO check true
}

const initialQuizStats: QuizDataStats = {
  quizItemStats: [],
  totalQuizItemsStats:  {
    totalTimeSpend: 0,
    totalTimeSpendFormatted: '',
    totalScore: 0,
    totalScorePercentage: 0,
    totalMostPopularCategory: null,
    totalMostPopularDifficulty: null,
    totalMostPopularType: null,
  }
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    quizSetup: initialQuizSetup,
    quizResponse: initialQuizResponse,
    loading: false,
    actualQuiz: initialQuizData,
    quizStats: initialQuizStats,
  }),

  getters: {
    isLoading: (state) => state.loading,
    isResponseError: (state) => state.quizResponse.error !== null,
    getResponseError: (state) => state.quizResponse.error,
    getQuizResponse: (state) => state.quizResponse,
    //
    isActualQuizCreated: (state) => !!state.actualQuiz.questionsData.length,
    isActualQuizFinished: (state) => state.actualQuiz.isFinished,
    getCurrentQuizQuestionIndex: (state) => state.actualQuiz.currentQuestionIndex,
    getQuizQuestions: (state) => state.actualQuiz.questionsData,
    //
    numberOfSelectedAnswers: (state) => state.actualQuiz.questionsData.filter(q => q.selectedAnswer).length,
    //
    getAllItemsStats: (state) => state.quizStats.quizItemStats,
    getTotalStats: (state) => state.quizStats.totalQuizItemsStats || {},
  },

  actions: {
    async loadQuestions(setupData: ApiSetup) {
      this.resetActualQuizData();
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
      const questionsData: QuestionData[] = data?.map((dataItem: ApiResponseData, index: number) => ({
          ...dataItem,
          id: index,
          randomAnswers: shuffleItems([dataItem.correctAnswer, ...dataItem.incorrectAnswers]),
          selectedAnswer: null
      }))

      this.actualQuiz = {
        ...this.actualQuiz,
        timeCouter: getTimeNow(),
        questionsData
      }
    },
    checkIfQuizHasAllAnswers() {
      return this.numberOfSelectedAnswers < this.actualQuiz.questionsData.length
    },
    resetAnswer(index: number) {
      this.actualQuiz.questionsData[index].selectedAnswer =  null;
    },
    chooseAnswer(index: number, answer: string) {
      this.actualQuiz.questionsData[index].selectedAnswer = answer;
      // this.checkIsQuizFinished()
    },
    goToNextQuestion() {
      if (this.actualQuiz.currentQuestionIndex < this.actualQuiz.questionsData.length - 1) {
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
      this.actualQuiz.isFinished = true
      this.prepareStats() 
    },
    prepareStats() {
      const timeEnded = getTimeNow();
      const timeSpend = calculateTimeSpend(this.actualQuiz.timeCouter, timeEnded);
      const newQuizStats: QuizItemFinished  = {
        ...this.actualQuiz,
        timeSpend,
        timeSpendFormatted: formatDuration(timeSpend),
        score: calculateScore(this.actualQuiz.questionsData),
        scorePercentage: calculateScorePercentage(this.actualQuiz.questionsData),
        mostPopularCategory: calculateTheMostPopularCategory(this.actualQuiz.questionsData),
        mostPopularType: calculateTheMostPopularType(this.actualQuiz.questionsData),
        mostPopularDifficulty: calculateMostPopularDifficulty(this.actualQuiz.questionsData),
      }
      this.quizStats.quizItemStats.push(newQuizStats)
      
      const allQuestionData = mergeQuestionsDataReduce(this.quizStats.quizItemStats)
      const totalTimeSpend = getSumOf(this.quizStats.quizItemStats, 'timeSpend')
      this.quizStats.totalQuizItemsStats = {
        totalTimeSpend, // calculateTotalTimeSpend(allQuestionData),
        totalTimeSpendFormatted: formatDuration(totalTimeSpend), // calculateTotalTimeSpendFormatted(allQuestionData),
        totalScore: getSumOf(this.quizStats.quizItemStats, 'score'), // calculateTotalScore(allQuestionData)
        totalScorePercentage: getAverageOf(this.quizStats.quizItemStats, 'scorePercentage'), // calculateTotalScorePercentage(allQuestionData)
        totalMostPopularCategory: calculateTheMostPopularCategory(allQuestionData),
        totalMostPopularDifficulty: calculateMostPopularDifficulty(allQuestionData),
        totalMostPopularType: calculateTheMostPopularType(allQuestionData),
      }
    },
  },
});
