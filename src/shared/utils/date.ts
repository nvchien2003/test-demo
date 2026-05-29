export const formatDate = (value: string): string =>
  new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(
    new Date(value),
  );

export const todayIso = (): string => new Date().toISOString();
