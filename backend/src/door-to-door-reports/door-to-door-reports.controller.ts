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
import { DoorToDoorReportsService } from './door-to-door-reports.service.js';
import { CreateDoorToDoorReportDto } from './dto/create-door-to-door-report.dto.js';
import { DoorToDoorReport } from './entities/door-to-door-report.entity.js';

@ApiTags('door-to-door-reports')
@Controller('door-to-door-reports')
export class DoorToDoorReportsController {
  constructor(
    private readonly doorToDoorReportsService: DoorToDoorReportsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List every door-to-door report' })
  @ApiOkResponse({ type: [DoorToDoorReport] })
  findAll(): DoorToDoorReport[] {
    return this.doorToDoorReportsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a door-to-door report' })
  @ApiCreatedResponse({ type: DoorToDoorReport })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  create(@Body() reportToCreate: CreateDoorToDoorReportDto): DoorToDoorReport {
    return this.doorToDoorReportsService.create(reportToCreate);
  }
}
