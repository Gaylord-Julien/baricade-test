import { Test, type TestingModule } from '@nestjs/testing';
import { DoorToDoorReportsRepository } from './door-to-door-reports.repository.js';
import { DoorToDoorReportsService } from './door-to-door-reports.service.js';

const UUID_PATTERN =
  /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/;

describe('DoorToDoorReportsService', () => {
  let doorToDoorReportsService: DoorToDoorReportsService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [DoorToDoorReportsService, DoorToDoorReportsRepository],
    }).compile();

    doorToDoorReportsService = testingModule.get(DoorToDoorReportsService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('findAll', () => {
    it('starts with no report', () => {
      expect(doorToDoorReportsService.findAll()).toEqual([]);
    });
  });

  describe('create', () => {
    it('stores a group report with an identifier and a creation date', () => {
      vi.useFakeTimers({ now: new Date('2026-11-01T18:30:00.000Z') });

      const createdReport = doorToDoorReportsService.create({
        role: 'group',
        groupName: 'Groupe Rouen',
        knockedDoorCount: 42,
        openedDoorCount: 17,
        comment: 'Bon accueil',
        longitude: 1.0993,
        latitude: 49.4431,
      });

      expect(createdReport).toEqual({
        id: expect.stringMatching(UUID_PATTERN) as unknown,
        createdAt: '2026-11-01T18:30:00.000Z',
        role: 'group',
        groupName: 'Groupe Rouen',
        knockedDoorCount: 42,
        openedDoorCount: 17,
        comment: 'Bon accueil',
        longitude: 1.0993,
        latitude: 49.4431,
      });
      expect(doorToDoorReportsService.findAll()).toEqual([createdReport]);
    });

    it('keeps only the provided fields for an individual report', () => {
      const createdReport = doorToDoorReportsService.create({
        role: 'individual',
        knockedDoorCount: 10,
        openedDoorCount: 0,
      });

      expect(
        Object.keys(createdReport).toSorted((first, second) =>
          first.localeCompare(second),
        ),
      ).toEqual([
        'createdAt',
        'id',
        'knockedDoorCount',
        'openedDoorCount',
        'role',
      ]);
    });

    it('gives each report a distinct identifier', () => {
      const payload = {
        role: 'individual',
        knockedDoorCount: 1,
        openedDoorCount: 1,
      } as const;

      const firstReport = doorToDoorReportsService.create(payload);
      const secondReport = doorToDoorReportsService.create(payload);

      expect(firstReport.id).not.toBe(secondReport.id);
      expect(doorToDoorReportsService.findAll()).toHaveLength(2);
    });
  });
});
