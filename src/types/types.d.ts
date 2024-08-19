type QuizDifficulty = "easy" | "medium" | "hard";
type QuizType = "boolean" | "multiple";

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

export interface QuizData {
  questionData: QuestionData[];
  score: number;
  time: number;
  currentQuestionIndex: number;
  isFinished: boolean;
}

// export interface QuizStats {
//   // quizDataMap: Map<number, QuizData>;
//   scorePercentage: number;
//   mostPopularDifficulty: QuizDifficulty | null;
//   mostPopularType: QuizType | null;
// }

export interface QuizState {
  quizSetup: ApiSetup;
  quizResponse: QuizResponse;
  loading: boolean;
  actualQuiz: QuizData; // | Omit<QuizData, 'questionData'>;
  // quizStats: QuizStats;
}