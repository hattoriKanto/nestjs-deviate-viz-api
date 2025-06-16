import { QUARTER } from 'src/types';

export const getQuarterFromDate = (date: Date): QUARTER | null => {
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  if (month === 2 && day === 31) return QUARTER.first;
  if (month === 5 && day === 30) return QUARTER.second;
  if (month === 8 && day === 30) return QUARTER.third;
  if (month === 11 && day === 31) return QUARTER.fourth;

  return null;
};
