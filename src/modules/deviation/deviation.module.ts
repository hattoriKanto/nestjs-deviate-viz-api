import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DeviationController } from './controllers/deviation.controller';
import { DeviationService } from './services/deviation.service';
import { IsValidIMONoMiddleware } from 'src/middlewares';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DeviationService],
  controllers: [DeviationController],
})
export class DeviationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsValidIMONoMiddleware)
      .forRoutes({ method: RequestMethod.GET, path: '*' });
  }
}
