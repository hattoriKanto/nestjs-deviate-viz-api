import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VesselsController } from './controllers/vessels.controller';
import { VesselsService } from './services/vessels.service';
import { IsValidIMONoMiddleware } from 'src/middlewares';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VesselsService],
  controllers: [VesselsController],
})
export class VesselsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsValidIMONoMiddleware)
      .forRoutes({
        method: RequestMethod.GET,
        path: '/vessels/:imono/deviation',
      });
  }
}
