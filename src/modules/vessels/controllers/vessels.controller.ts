import { Controller, Get } from '@nestjs/common';
import { Vessel } from '@prisma/client';
import { GetIMONo } from 'src/decorators';
import { VesselsService } from '../services/vessels.service';
import { DeviationWithMetadata } from 'src/types';

@Controller('vessels')
export class VesselsController {
  constructor(private vesselsService: VesselsService) {}

  @Get()
  getVessels(): Promise<Vessel[]> {
    return this.vesselsService.findAllVessels();
  }

  @Get(':imono/deviation')
  async getDeviationByVessel(
    @GetIMONo() IMONo: number,
  ): Promise<DeviationWithMetadata[]> {
    return this.vesselsService.calculateDeviationByVessel(IMONo);
  }
}
