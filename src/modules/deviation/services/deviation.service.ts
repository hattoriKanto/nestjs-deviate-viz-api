import { BadRequestException, Injectable } from '@nestjs/common';
import { Vessel } from '@prisma/client';
import Decimal from 'decimal.js';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { PPBaselinesWithMetadata } from 'src/types';
import { calculatePPSCCBaselines, getQuarterFromDate } from 'src/utils';

@Injectable()
export class DeviationService {
  constructor(private prismaService: PrismaService) {}

  findAllVessels(): Promise<Vessel[]> {
    return this.prismaService.vessel.findMany();
  }

  findVesselByIMO(IMONo: number): Promise<Vessel> {
    return this.prismaService.vessel.findUnique({ where: { IMONo } });
  }

  async getBaseline(IMONo: number): Promise<PPBaselinesWithMetadata[]> {
    // вытаскиваем судно
    const vessel = await this.findVesselByIMO(IMONo);
    if (!vessel) {
      throw new BadRequestException();
    }
    const quarterBaselines: PPBaselinesWithMetadata[] = [];

    // вытаскиваем factors: по два на vesselType
    const factors = await this.prismaService.reference.findMany({
      where: { VesselTypeID: vessel.VesselType },
    });

    // вытаскиваем dailyLogs для судна
    const dailyLogs = await this.prismaService.dailyLog.findMany({
      where: { VesselID: vessel.IMONo },
    });

    // ищем квартал: если true, то вычисляем baseline
    dailyLogs.forEach(({ TOUTC }) => {
      const quarter = getQuarterFromDate(TOUTC);
      if (!quarter) {
        return;
      }

      const year = new Date(TOUTC).getUTCFullYear();
      const baselines = calculatePPSCCBaselines({
        factors,
        year,
        DWT: Decimal(vessel.DWT),
      });

      quarterBaselines.push({ baselines, year, quarter });
    });

    return quarterBaselines;
  }

  async getDeviationByVessel(IMONo: number) {
    const baselines = await this.getBaseline(IMONo);
  }
}
