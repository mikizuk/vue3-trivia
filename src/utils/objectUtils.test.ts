import { describe, it, expect } from 'vitest';
import { snakeToCamel, convertKeysToCamelCase } from './objectUtils';

describe('snakeToCamel', () => {
  it('should convert snake case to camel case', () => {
    expect(snakeToCamel('my_function_name')).toEqual('myFunctionName');
    expect(snakeToCamel('another_example')).toEqual('anotherExample');
  });

  it('should handle single-letter strings', () => {
    expect(snakeToCamel('x')).toEqual('x');
  });

  it('should handle empty strings', () => {
    expect(snakeToCamel('')).toEqual('');
  });
});

describe('convertKeysToCamelCase', () => {
  it('should convert object keys to camel case', () => {
    const input = {
      my_key: 'value',
      another_key: 'another_value',
    };
    const expected = {
      myKey: 'value',
      anotherKey: 'another_value',
    };
    expect(convertKeysToCamelCase(input)).toEqual(expected);
  });

  it('should handle nested objects', () => {
    const input = {
      my_key: {
        nested_key: 'nested_value',
        another_nested_key: 'another_nested_value',
      },
      another_key: 'value',
    };
    const expected = {
      myKey: {
        nestedKey: 'nested_value',
        anotherNestedKey: 'another_nested_value',
      },
      anotherKey: 'value',
    };
    expect(convertKeysToCamelCase(input)).toEqual(expected);
  });

  it('should handle arrays', () => {
    const input = [
      { my_key: 'value' },
      { another_key: 'another_value' },
    ];
    const expected = [
      { myKey: 'value' },
      { anotherKey: 'another_value' },
    ];
    expect(convertKeysToCamelCase(input)).toEqual(expected);
  });

  it('should handle primitive values', () => {
    expect(convertKeysToCamelCase('string')).toEqual('string');
    expect(convertKeysToCamelCase(42)).toEqual(42);
    expect(convertKeysToCamelCase(true)).toEqual(true);
    expect(convertKeysToCamelCase(null)).toEqual(null);
    expect(convertKeysToCamelCase(undefined)).toEqual(undefined);
  });
});