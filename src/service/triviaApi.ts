import type { ApiSetup, ApiResponse } from "@/types/types";
import { convertKeysToCamelCase } from "@/utils/objectUtils";

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

export async function fetchQuestions(quizSetup: ApiSetup): Promise<ApiResponse> {
  const BASE_URL = `https://opentdb.com/api.php`;

  const params = new URLSearchParams({
    amount: quizSetup.numberOfQuestions.toString(),
  })
  if (quizSetup.selectedCategoryValue) {
    params.set('category', quizSetup.selectedCategoryValue.toString())
  }
  if (quizSetup.selectedDifficultyValue !== "any") {
    params.set('difficulty', quizSetup.selectedDifficultyValue.toString())
  }
  if (quizSetup.selectedTypeValue !== "any") {
    params.set('type', quizSetup.selectedTypeValue.toString())
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
      data: {},
      error: (error as Error).message
    };
  }

}