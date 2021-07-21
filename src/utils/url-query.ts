export const getFirstInstanceOfQuery = (query?: string | string[]): string => {
  if (query === undefined) return '';

  return Array.isArray(query) ? query[0] : query;
};
