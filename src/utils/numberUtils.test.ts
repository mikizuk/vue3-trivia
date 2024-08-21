import { describe, it, expect } from 'vitest';
import { roundNumber2Digits } from './numberUtils';

describe('roundNumber2Digits', () => {
  it('should round a number to two decimal places', () => {
    expect(roundNumber2Digits(3.14159)).toEqual(3.14);
    expect(roundNumber2Digits(2.7182818)).toEqual(2.72);
    expect(roundNumber2Digits(1.0)).toEqual(1.00);
  });

  it('should handle positive numbers', () => {
    expect(roundNumber2Digits(0.12)).toEqual(0.12);
    expect(roundNumber2Digits(42.0)).toEqual(42.00);
  });

  it('should handle negative numbers', () => {
    expect(roundNumber2Digits(-3.14159)).toEqual(-3.14);
    expect(roundNumber2Digits(-0.99)).toEqual(-0.99);
  });

  it('should handle zero', () => {
    expect(roundNumber2Digits(0)).toEqual(0.00);
  });

  it('should handle numbers with more than two decimal places', () => {
    expect(roundNumber2Digits(3.1415926535)).toEqual(3.14);
    expect(roundNumber2Digits(2.718281828459)).toEqual(2.72);
  });
});