import { Body, Controller, Get, Param } from '@nestjs/common';
import { Vessel } from '@prisma/client';
import { GetIMONo } from 'src/decorators';
import { DeviationService } from '../services/deviation.service';
import { PPBaselinesWithMetadata } from 'src/types';

@Controller('deviation')
export class DeviationController {
  constructor(private deviationService: DeviationService) {}

  @Get()
  getVessels(): Promise<Vessel[]> {
    return this.deviationService.findAllVessels();
  }

  @Get(':imono')
  async getQuartersBaselines(
    @GetIMONo() IMONo: number,
  ): Promise<PPBaselinesWithMetadata[]> {
    return this.deviationService.getBaseline(IMONo);
  }
}
