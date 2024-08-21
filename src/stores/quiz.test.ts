import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useQuizStore } from './quiz';
import { fetchQuestions } from '@/service/triviaApi';
import { shuffleItems } from '@/utils/arrayUtils';
import { getTimeNow, formatDuration, calculateTimeSpend } from "@/utils/dateUtils";
import type { ApiSetup, QuestionData } from '@/types/types';

// Mock the imported functions
vi.mock('@/service/triviaApi', () => ({
  fetchQuestions: vi.fn(),
}));

vi.mock('@/utils/arrayUtils', () => ({
  shuffleItems: vi.fn(),
  calculateScore: vi.fn(),
  calculateScorePercentage: vi.fn(),
  calculateTheMostPopularCategory: vi.fn(),
  calculateTheMostPopularType: vi.fn(),
  calculateMostPopularDifficulty: vi.fn(),
  mergeQuestionsDataReduce: vi.fn(),
  getSumOf: vi.fn(),
  getAverageOf: vi.fn(),
}));

vi.mock('@/utils/dateUtils', () => ({
  getTimeNow: vi.fn(),
  formatDuration: vi.fn(),
  calculateTimeSpend: vi.fn(),
}));

describe('useQuizStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with the correct default state', () => {
    const quizStore = useQuizStore();

    expect(quizStore.quizSetup.numberOfQuestions).toBe(3);
    expect(quizStore.quizResponse.data).toEqual({});
    expect(quizStore.actualQuiz.questionsData).toHaveLength(0);
    expect(quizStore.quizStats.quizItemStats).toHaveLength(0);
  });

  it('sets loading state and fetches questions on loadQuestions', async () => {
    const quizStore = useQuizStore();
    const mockQuestions: QuestionData[] = [
      {
        id: 1,
        category: 'History',
        correctAnswer: 'a',
        difficulty: 'easy',
        incorrectAnswers: ['b', 'c', 'd'],
        question: 'What is the first capital of France?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'a'
      },
      {
        id: 2,
        category: 'Science',
        correctAnswer: 'b',
        difficulty: 'medium',
        incorrectAnswers: ['a', 'c', 'd'],
        question: 'What is the chemical symbol for Oxygen?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'b'
      },
      {
        id: 3,
        category: 'History',
        correctAnswer: 'c',
        difficulty: 'hard',
        incorrectAnswers: ['a', 'b', 'd'],
        question: 'Who was the first president of the United States?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'd'
      }
    ];
    fetchQuestions.mockResolvedValue({ data: mockQuestions });
    const quizSetup: ApiSetup = {
      numberOfQuestions: 5,
      selectedCategoryValue: 9,
      selectedDifficultyValue: 'easy',
      selectedTypeValue: 'multiple',
      selectedEncodeValue: 'default'
    };

    await quizStore.loadQuestions(quizSetup);

    expect(quizStore.loading).toBe(false);
    expect(fetchQuestions).toHaveBeenCalledWith(quizSetup);
    expect(quizStore.quizResponse.data).toEqual(mockQuestions);
    expect(quizStore.actualQuiz.questionsData).toHaveLength(mockQuestions.length);
  });

  it('handles errors in loadQuestions', async () => {
    const quizStore = useQuizStore();
    const quizSetup: ApiSetup = {
      numberOfQuestions: 5,
      selectedCategoryValue: 9,
      selectedDifficultyValue: 'easy',
      selectedTypeValue: 'multiple',
      selectedEncodeValue: 'default'
    };
    fetchQuestions.mockResolvedValue({ data: null, error: 'API Error' });

    await quizStore.loadQuestions(quizSetup);

    expect(quizStore.loading).toBe(false);
    expect(quizStore.quizResponse.error).toBe('API Error');
    expect(quizStore.actualQuiz.questionsData).toHaveLength(0);
  });

  it('prepareQuiz correctly processes quiz data', () => {
    const quizStore = useQuizStore();
    const questionsData: QuestionData[] = [
      {
        id: 1,
        category: 'General Knowledge',
        correctAnswer: 'a',
        difficulty: 'easy',
        incorrectAnswers: ['b', 'c', 'd'],
        question: 'What is the capital of France?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'a'
      },
      {
        id: 2,
        category: 'Science',
        correctAnswer: 'b',
        difficulty: 'medium',
        incorrectAnswers: ['a', 'c', 'd'],
        question: 'What is the chemical symbol for Oxygen?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'b'
      },
      {
        id: 3,
        category: 'History',
        correctAnswer: 'c',
        difficulty: 'hard',
        incorrectAnswers: ['a', 'b', 'd'],
        question: 'Who was the first president of the United States?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'd'
      },
    ];

    shuffleItems.mockReturnValue(['a', 'b', 'c', 'd']);

    quizStore.prepareQuiz(questionsData);

    expect(quizStore.actualQuiz.questionsData).toHaveLength(3);
    expect(quizStore.actualQuiz.questionsData[0].randomAnswers).toEqual(['a', 'b', 'c', 'd']);
  });

  it('finishQuiz finalizes quiz and prepares stats', () => {
    const quizStore = useQuizStore();
    const mockTimeNow = 2000;
    const questionsData: QuestionData[] = [
      {
        id: 1,
        category: 'General Knowledge',
        correctAnswer: 'a',
        difficulty: 'easy',
        incorrectAnswers: ['b', 'c', 'd'],
        question: 'What is the capital of France?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'a'
      },
      {
        id: 2,
        category: 'Science',
        correctAnswer: 'b',
        difficulty: 'medium',
        incorrectAnswers: ['a', 'c', 'd'],
        question: 'What is the chemical symbol for Oxygen?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'b'
      },
      {
        id: 3,
        category: 'History',
        correctAnswer: 'c',
        difficulty: 'hard',
        incorrectAnswers: ['a', 'b', 'd'],
        question: 'Who was the first president of the United States?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'd'
      },
    ];

    getTimeNow.mockReturnValue(mockTimeNow);
    quizStore.actualQuiz.questionsData = questionsData;
    quizStore.finishQuiz();

    expect(quizStore.actualQuiz.isFinished).toBe(true);
    expect(calculateTimeSpend).toHaveBeenCalledWith(quizStore.actualQuiz.timeCouter, mockTimeNow);
    expect(quizStore.quizStats.quizItemStats).toHaveLength(1);
  });

});
