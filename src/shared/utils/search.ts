export const normalizeSearch = (value: string): string => value.trim().toLowerCase();

export const includesSearch = (value: string, query: string): boolean =>
  value.toLowerCase().includes(query);
