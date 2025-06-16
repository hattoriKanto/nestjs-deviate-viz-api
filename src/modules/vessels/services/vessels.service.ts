import { BadRequestException, Injectable } from '@nestjs/common';
import { Vessel } from '@prisma/client';
import Decimal from 'decimal.js';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { DeviationWithMetadata } from 'src/types';
import { getDataForDeviation } from 'src/utils';

@Injectable()
export class VesselsService {
  constructor(private prismaService: PrismaService) {}

  findAllVessels(): Promise<Vessel[]> {
    return this.prismaService.vessel.findMany();
  }

  findVesselByIMO(IMONo: number): Promise<Vessel> {
    return this.prismaService.vessel.findUnique({ where: { IMONo } });
  }

  async calculateDeviationByVessel(
    IMONo: number,
  ): Promise<DeviationWithMetadata[]> {
    const vessel = await this.findVesselByIMO(IMONo);
    if (!vessel) {
      throw new BadRequestException('Vessel with such IMONo does not exist');
    }

    const factors = await this.prismaService.reference.findMany({
      where: { VesselTypeID: vessel.VesselType },
    });
    const dailyLogs = await this.prismaService.dailyLog.findMany({
      where: { VesselID: IMONo },
    });

    const data = getDataForDeviation({
      dailyLogs,
      factors,
      DWT: Decimal(vessel.DWT),
    });

    return data
      .reduce((accum, { AER, baselineMin, quarter, year }) => {
        const deviation = AER.minus(baselineMin)
          .div(baselineMin)
          .mul(100)
          .toDecimalPlaces(2);

        accum.push({ deviation, quarter, year });

        return accum;
      }, [] as DeviationWithMetadata[])
      .sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }

        const quarterOrder = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 };
        return quarterOrder[a.quarter] - quarterOrder[b.quarter];
      });
  }
}
