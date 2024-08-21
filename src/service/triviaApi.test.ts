import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchQuestions } from './triviaApi';
import { convertKeysToCamelCase } from '@/utils/objectUtils';

vi.mock('@/utils/objectUtils', () => ({
  convertKeysToCamelCase: vi.fn(),
}));

describe('fetchQuestions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle successful API response', async () => {
    const mockApiResponse = {
      responseCode: 0, // Success code
      results: [{ question: 'Sample Question', correctAnswer: 'Sample Answer', incorrectAnswers: [] }],
    };

    // Mock the fetch API
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    // Mock convertKeysToCamelCase
    (convertKeysToCamelCase as vi.Mock).mockReturnValue(mockApiResponse);

    const quizSetup = {
      numberOfQuestions: 5,
      selectedCategoryValue: 9,
      selectedDifficultyValue: 'easy',
      selectedTypeValue: 'multiple',
      selectedEncodeValue: 'default'
    };

    const result = await fetchQuestions(quizSetup);

    expect(result).toEqual({
      data: mockApiResponse.results,
      error: null,
    });
  });

});
