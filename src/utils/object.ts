function snakeToCamel(snakeCase: string): string {
  return snakeCase.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToCamelCase(item));
  } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
          const camelCaseKey = snakeToCamel(key);
          acc[camelCaseKey] = convertKeysToCamelCase(obj[key]);
          return acc;
      }, {} as any);
  }
  return obj;
}