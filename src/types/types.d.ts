export interface QuizSetup {
  numberOfQuestions: number;
  selectedCategoryValue: number;
  selectedDifficultyValue: string;
  selectedTypeValue: string;
  selectedEncodeValue: string;
}

export interface QuizResponse { // FetchResult {
  data: any; // TODO:
  error: string | null;
}

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  quizSetup: QuizSetup,
  quizResponse: QuizResponse,
  loading: boolean,
  // error: string | null,
  // questions: Question[];
  // currentQuestionIndex: number;
  // answers: string[];
}