import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateInterestPointDto } from './dto/create-interest-point.dto.js';
import { InterestPoint } from './entities/interest-point.entity.js';
import { InterestPointsService } from './interest-points.service.js';

@ApiTags('interest-points')
@Controller('interest-points')
export class InterestPointsController {
  constructor(private readonly interestPointsService: InterestPointsService) {}

  @Get()
  @ApiOperation({ summary: 'List every interest point' })
  @ApiOkResponse({ type: [InterestPoint] })
  findAll(): InterestPoint[] {
    return this.interestPointsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an interest point' })
  @ApiCreatedResponse({ type: InterestPoint })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  create(@Body() interestPointToCreate: CreateInterestPointDto): InterestPoint {
    return this.interestPointsService.create(interestPointToCreate);
  }
}
