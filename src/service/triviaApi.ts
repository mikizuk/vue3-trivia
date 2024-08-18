import type { QuizSetup, QuizResponse } from "@/types/types";
import { convertKeysToCamelCase } from "@/utils/object";

enum ReponseEnum {
  Success = 0,
  NoResults,
  InvalidParameter,
  TokenNotFound,
  TokenEmpty,
  RateLimit,
}

interface TriviaResponse {
  responseCode: ReponseEnum;
  results: [];
}

export const MIN_QUESTIONS = 1;
export const MAX_QUESTIONS = 50;

export async function fetchQuestions(qSetup: QuizSetup): Promise<QuizResponse> {
  const BASE_URL = `https://opentdb.com/api.php`;

  const params = new URLSearchParams({
    amount: qSetup.numberOfQuestions.toString(),
  })
  if (qSetup.selectedCategoryValue) {
    params.set('category', qSetup.selectedCategoryValue.toString())
  }
  if (qSetup.selectedDifficultyValue !== "any") {
    params.set('difficulty', qSetup.selectedDifficultyValue.toString())
  }
  if (qSetup.selectedTypeValue !== "any") {
    params.set('type', qSetup.selectedTypeValue.toString())
  }

  const url = `${BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        // 'cross-origin-resource-policy': 'cross-origin',
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch questions. Status: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error('No data received from the API');
    }
    const convertedData: TriviaResponse = convertKeysToCamelCase(data);
    if (convertedData.responseCode === ReponseEnum.Success) {
      return {
        data: convertedData.results,
        error: null
      };
    }
    else {
      throw new Error(`API returned an unsuccessful response code: ${convertedData.responseCode}`);
    }
  } catch (error: unknown) {
    console.error('Error fetching questions:', error);

    return {
      data: null,
      error: (error as Error).message
    };
  }

}