import type { QuestionData, QuizType, QuizDifficulty } from "@/types/types";
import { describe, it, expect } from 'vitest';
import {
  shuffleItems,
  calculateScore,
  calculateScorePercentage,
  calculateMostPopular,
  getSumOf,
  getAverageOf,
} from './arrayUtils';

describe('shuffleItems', () => {
  it('should shuffle the array', () => {
    const originalArray = ['item1', 'item2', 'item3', 'item4', 'item5'];
    const shuffledArray = shuffleItems(originalArray);
    expect(shuffledArray).not.toEqual(originalArray);
    expect(shuffledArray.length).toEqual(originalArray.length);
    expect(shuffledArray).toEqual(expect.arrayContaining(originalArray));
  });
});

describe('calculateScore', () => {
  it('should calculate the score correctly', () => {
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
      }
    ];
    expect(calculateScore(questionsData)).toEqual(2);
  });

  it('should return 0 for an empty array', () => {
    expect(calculateScore([])).toEqual(0);
  });
});

describe('calculateScorePercentage', () => {
  it('should calculate the score percentage correctly', () => {
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
      {
        id: 4,
        category: 'Science',
        correctAnswer: 'b',
        difficulty: 'medium',
        incorrectAnswers: ['a', 'c', 'd'],
        question: 'What is the chemical symbol for Silver?',
        type: 'multiple',
        randomAnswers: ['a', 'b', 'c', 'd'],
        selectedAnswer: 'b'
      },
    ];
    expect(calculateScorePercentage(questionsData)).toEqual(75);
  });

  it('should return 0 for an empty array', () => {
    expect(calculateScorePercentage([])).toEqual(0);
  });
});

describe('calculateMostPopular', () => {
  it('should calculate the most popular item', () => {
    const questionsData: QuestionData[] = [
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
    expect(calculateMostPopular(questionsData, (item: { category: string; }) => item.category)).toEqual('History');
    expect(calculateMostPopular(questionsData, (item: { type: QuizType; }) => item.type)).toEqual('multiple');
    expect(calculateMostPopular(questionsData, (item: { difficulty: QuizDifficulty; }) => item.difficulty)).toEqual('easy');
  });

  it('should return null for an empty array', () => {
    expect(calculateMostPopular([], (item: { category: any; }) => item.category)).toBeNull();
  });
});

describe('getSumOf', () => {
  it('should calculate the sum of a property', () => {
    const data = [
      { value: 10 },
      { value: 20 },
      { value: 30 },
    ];
    expect(getSumOf(data, 'value')).toEqual(60);
  });

  it('should handle missing properties', () => {
    const data = [
      { value: 10 },
      { value: 20 },
      { },
    ];
    expect(getSumOf(data, 'value')).toEqual(30);
  });
});

describe('getAverageOf', () => {
  it('should calculate the average of a property', () => {
    const data = [
      { value: 10 },
      { value: 20 },
      { value: 30 },
    ];
    expect(getAverageOf(data, 'value')).toEqual(20);
  });

  it('should return 0 for an empty array', () => {
    expect(getAverageOf([], 'value')).toEqual(0);
  });
});
