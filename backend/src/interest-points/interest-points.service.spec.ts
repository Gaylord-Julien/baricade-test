import { Test, type TestingModule } from '@nestjs/testing';
import { INTEREST_POINT_STATUSES } from './entities/interest-point.entity.js';
import { InterestPointsRepository } from './interest-points.repository.js';
import { InterestPointsService } from './interest-points.service.js';
import { loadInterestPointSeed } from './seed/interest-points-seed.js';

const SEED_POINT_COUNT = loadInterestPointSeed().length;
const ROUEN_BOUNDS = {
  minimumLongitude: 1.08,
  maximumLongitude: 1.12,
  minimumLatitude: 49.43,
  maximumLatitude: 49.46,
};

const UUID_PATTERN =
  /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/;

describe('InterestPointsService', () => {
  let interestPointsService: InterestPointsService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [InterestPointsService, InterestPointsRepository],
    }).compile();

    interestPointsService = testingModule.get(InterestPointsService);
  });

  describe('findAll', () => {
    it('returns every seeded interest point', () => {
      expect(SEED_POINT_COUNT).toBeGreaterThan(0);
      expect(interestPointsService.findAll()).toHaveLength(SEED_POINT_COUNT);
    });

    it('places every seeded point in Rouen with a valid shape', () => {
      for (const interestPoint of interestPointsService.findAll()) {
        expect(interestPoint.longitude).toBeGreaterThan(
          ROUEN_BOUNDS.minimumLongitude,
        );
        expect(interestPoint.longitude).toBeLessThan(
          ROUEN_BOUNDS.maximumLongitude,
        );
        expect(interestPoint.latitude).toBeGreaterThan(
          ROUEN_BOUNDS.minimumLatitude,
        );
        expect(interestPoint.latitude).toBeLessThan(
          ROUEN_BOUNDS.maximumLatitude,
        );
        expect(INTEREST_POINT_STATUSES).toContain(interestPoint.status);
        expect(Number.isSafeInteger(interestPoint.weight)).toBe(true);
        expect(interestPoint.weight).toBeGreaterThanOrEqual(1);
        expect(interestPoint.weight).toBeLessThanOrEqual(5);
        expect(interestPoint.id).toMatch(UUID_PATTERN);
      }
    });

    it('uses every status, with undecided as the most common', () => {
      const statuses = interestPointsService
        .findAll()
        .map(({ status }) => status);
      const countOf = (status: string) =>
        statuses.filter((current) => current === status).length;

      for (const status of INTEREST_POINT_STATUSES) {
        expect(countOf(status)).toBeGreaterThan(0);
      }
      expect(countOf('undecided')).toBe(
        Math.max(...INTEREST_POINT_STATUSES.map((status) => countOf(status))),
      );
    });

    it('returns a copy that cannot alter the stored points', () => {
      interestPointsService.findAll().pop();

      expect(interestPointsService.findAll()).toHaveLength(SEED_POINT_COUNT);
    });
  });

  describe('create', () => {
    it('stores a new interest point with the default weight', () => {
      const createdInterestPoint = interestPointsService.create({
        longitude: 1.1,
        latitude: 49.44,
        status: 'favorable',
        label: 'Résidence des Sapins',
      });

      expect(createdInterestPoint).toEqual({
        id: expect.stringMatching(UUID_PATTERN) as unknown,
        longitude: 1.1,
        latitude: 49.44,
        status: 'favorable',
        weight: 3,
        label: 'Résidence des Sapins',
      });
      expect(interestPointsService.findAll()).toContainEqual(
        createdInterestPoint,
      );
    });

    it('omits the label when none is provided', () => {
      const createdInterestPoint = interestPointsService.create({
        longitude: 1.1,
        latitude: 49.44,
        status: 'absent',
      });

      expect(createdInterestPoint).not.toHaveProperty('label');
    });
  });
});
