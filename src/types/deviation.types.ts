import { DailyLog, Reference } from '@prisma/client';
import Decimal from 'decimal.js';
import { QUARTER } from './quarter.types';

export type DeviationWithMetadata = {
  quarter: QUARTER;
  year: number;
  deviation: Decimal;
};

export type GetDataForDeviationArgs = {
  dailyLogs: DailyLog[];
  factors: Reference[];
  DWT: Decimal;
};

export type DataForDeviation = {
  quarter: QUARTER;
  year: number;
  AER: Decimal;
  baselineMin: Decimal;
};
