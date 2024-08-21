import { describe, it, expect } from 'vitest';
import { convertString } from './stringUtils';

describe('convertString', () => {
  it('should replace &quot; with "', () => {
    const input = 'This is &quot;a test&quot;';
    const expected = 'This is "a test"';
    const result = convertString(input);
    expect(result).toBe(expected);
  });

  it('should replace &#039; with \'', () => {
    const input = 'This is &#039;a test&#039;';
    const expected = 'This is \'a test\'';
    const result = convertString(input);
    expect(result).toBe(expected);
  });

  it('should replace &#215; with ×', () => {
    const input = 'This is &#215;';
    const expected = 'This is ×';
    const result = convertString(input);
    expect(result).toBe(expected);
  });

  it('should not modify the input string if no replacements are needed', () => {
    const input = 'This is a test';
    const expected = 'This is a test';
    const result = convertString(input);
    expect(result).toBe(expected);
  });
});