import { Reference as CE_PPSCCReferenceLine } from '@prisma/client';
import Decimal from 'decimal.js';

export type PPSSCPreferenceLine = Omit<
  CE_PPSCCReferenceLine,
  'RowID' | 'Category' | 'VesselTypeID' | 'Size'
>;

export type CalculatePPBaselinesArgs = {
  factors: PPSSCPreferenceLine[];
  year: number;
  DWT: Decimal;
};

export type PPBaselines = {
  min: Decimal;
  striving: Decimal;
  yxLow: Decimal;
  yxUp: Decimal;
};

export type CalculateBaselineArgs = {
  factors: PPSSCPreferenceLine;
  year: number;
  DWT: Decimal;
};

export type PPBaselinesWithMetadata = {
  year: number;
  quarter: string;
  baselines: PPBaselines;
};
