import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadAppConfig } from './config/app-config.js';
import { DoorToDoorReportsModule } from './door-to-door-reports/door-to-door-reports.module.js';
import { InterestPointsModule } from './interest-points/interest-points.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [loadAppConfig],
    }),
    InterestPointsModule,
    DoorToDoorReportsModule,
  ],
})
export class AppModule {}
