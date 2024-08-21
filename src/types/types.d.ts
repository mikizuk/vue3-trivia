export type QuizDifficulty = "easy" | "medium" | "hard";
export type QuizType = "boolean" | "multiple";

export interface ApiSetup {
  numberOfQuestions: number;
  selectedCategoryValue: number;
  selectedDifficultyValue: string;
  selectedTypeValue: string;
  selectedEncodeValue: string;
}

export interface ApiResponse {
  data: ApiResponseData[] | {};
  error: string | null;
}

export interface ApiResponseData {
  category: string;
  correctAnswer: string;
  difficulty: QuizDifficulty;
  incorrectAnswers: string[];
  question: string;
  type: QuizType;
}

export interface QuestionData extends ApiResponseData {
  id: number;
  randomAnswers: string[];
  selectedAnswer?: string | null;
}

export interface QuizItemStarted {
  questionsData: QuestionData[];
  timeCouter: number;
  currentQuestionIndex: number;
  isFinished: boolean;
}

export interface QuizItemFinished extends QuizItemStarted {
  timeSpend: number;
  timeSpendFormatted: string;
  score: number;
  scorePercentage: number;
  mostPopularCategory: string | null;
  mostPopularDifficulty: QuizDifficulty | null;
  mostPopularType: QuizType | null;
}

export interface QuizTotal {
  totalTimeSpend: number;
  totalTimeSpendFormatted: string;
  totalScore: number;
  totalScorePercentage: number;
  totalMostPopularCategory: string | null;
  totalMostPopularDifficulty: QuizDifficulty | null;
  totalMostPopularType: QuizType | null;
}

export interface QuizDataStats {
  quizItemStats: QuizItemFinished[];
  totalQuizItemsStats: QuizTotal;
}

export interface QuizState {
  quizSetup: ApiSetup;
  quizResponse: QuizResponse;
  loading: boolean;
  actualQuiz: QuizItemStarted;
  quizStats: QuizDataStats;
}