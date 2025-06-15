import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DeviationModule } from './modules/deviation/deviation.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DeviationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
