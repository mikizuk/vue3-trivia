import type { QuestionData, QuizType, QuizDifficulty, QuizItemFinished } from "@/types/types";
import { roundNumber2Digits } from "./numberUtils";


export const shuffleItems = (array: string[]) => array
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

export const calculateScore = (array: QuestionData[]): number => {
  if (!array.length) {
    return 0
  }
  return array.filter(item => item.correctAnswer === item.selectedAnswer).length
}

export const calculateScorePercentage = (array: QuestionData[]): number => {
  if (!array.length) {
    return 0
  }
  const percentage = calculateScore(array) / array.length
  return roundNumber2Digits(percentage) * 100
}

export const calculateMostPopular = <T>(
  array: QuestionData[], 
  keySelector: (item: QuestionData) => T
): T | null => {
  let mostPopular: T | null = null;
  if (!array.length) {
    return null;
  }

  let maxCount = 0;
  
  array.forEach(item => {
    const key = keySelector(item);
    const keyCount = array.filter(i => keySelector(i) === key).length;

    if (keyCount > maxCount) {
      maxCount = keyCount;
      mostPopular = key;
    }
  });

  return mostPopular;
}

export const getSumOf = <T extends Record<string, any>>(array: any[], key: keyof T): number => {
  return array.reduce((sum, item) => sum + (item[key] || 0), 0);
}

export const getAverageOf = <T extends Record<string, any>>(array: T[], key: keyof T): number => {
  if (!array.length) {
    return 0
  }
  return roundNumber2Digits((getSumOf(array, key) / array.length));
}

export const calculateTheMostPopularCategory = (array: QuestionData[]): string | null => {
  return calculateMostPopular<string>(array, item => item.category);
}

export const calculateTheMostPopularType = (array: QuestionData[]): QuizType | null => {
  return calculateMostPopular<QuizType>(array, item => item.type);
}

export const calculateMostPopularDifficulty = (array: QuestionData[]): QuizDifficulty | null => {
  return calculateMostPopular<QuizDifficulty>(array, item => item.difficulty)
}

// export const calculateTotalTimeSpend = (array: QuestionData[]): number => {
//   return getSumOf(array, 'timeSpend')
// }

// export const calculateTotalTimeSpendFormatted = (array: QuestionData[]): string => {
//   return formatDuration(getSumOf(array, 'timeSpend'))
// }

// export const calculateTotalScore = (array: QuestionData[]): number => {
//   return getSumOf(array, 'score')
// }
// export const calculateTotalScorePercentage = (array: any[]): number => {
//   return getAverageOf(array, 'totalScorePercentage')
// }

//
export const mergeQuestionsDataReduce = (objects: QuizItemFinished[]): QuestionData[] =>
  objects.reduce<QuestionData[]>((accumulator, currentObject) =>
    accumulator.concat(currentObject.questionsData), []
);
