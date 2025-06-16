import Decimal from 'decimal.js';
import { getQuarterFromDate } from './is-quarter-end.util';
import { calculatePPSCCBaselines } from '.';
import { DataForDeviation, GetDataForDeviationArgs } from 'src/types';

export const getDataForDeviation = ({
  dailyLogs,
  factors,
  DWT,
}: GetDataForDeviationArgs): DataForDeviation[] => {
  const data: DataForDeviation[] = [];

  dailyLogs.forEach(({ TOUTC, AERCO2T2W }) => {
    const quarter = getQuarterFromDate(TOUTC);
    if (!quarter) {
      return;
    }

    const year = new Date(TOUTC).getUTCFullYear();
    const baselines = calculatePPSCCBaselines({
      factors,
      year,
      DWT,
    });

    data.push({
      quarter,
      year,
      baselineMin: Decimal(baselines.min),
      AER: Decimal(AERCO2T2W),
    });
  });

  return data;
};
