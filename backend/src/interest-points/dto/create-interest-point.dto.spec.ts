import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateInterestPointDto } from './create-interest-point.dto.js';

async function findInvalidProperties(payload: object): Promise<string[]> {
  const errors = await validate(
    plainToInstance(CreateInterestPointDto, payload),
  );
  return errors.map((error) => error.property);
}

describe('CreateInterestPointDto', () => {
  it('accepts a valid interest point', async () => {
    expect(
      await findInvalidProperties({
        longitude: 1.0993,
        latitude: 49.4431,
        status: 'undecided',
      }),
    ).toEqual([]);
  });

  it('rejects out-of-range coordinates and unknown statuses', async () => {
    expect(
      await findInvalidProperties({
        longitude: -181,
        latitude: 90.5,
        status: 'maybe',
      }),
    ).toEqual(['longitude', 'latitude', 'status']);
  });
});
