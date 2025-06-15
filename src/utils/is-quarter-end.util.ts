export const getQuarterFromDate = (date: Date): string | null => {
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  if (month === 2 && day === 31) return 'Q1';
  if (month === 5 && day === 30) return 'Q2';
  if (month === 8 && day === 30) return 'Q3';
  if (month === 11 && day === 31) return 'Q4';

  return null;
};
