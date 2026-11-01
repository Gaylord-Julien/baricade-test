import { Module } from '@nestjs/common';
import { InterestPointsController } from './interest-points.controller.js';
import { InterestPointsRepository } from './interest-points.repository.js';
import { InterestPointsService } from './interest-points.service.js';

@Module({
  controllers: [InterestPointsController],
  providers: [InterestPointsService, InterestPointsRepository],
})
export class InterestPointsModule {}
