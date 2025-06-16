import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VesselsModule } from './modules/vessels/vessels.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), VesselsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
