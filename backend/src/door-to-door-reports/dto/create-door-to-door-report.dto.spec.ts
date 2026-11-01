import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateDoorToDoorReportDto } from './create-door-to-door-report.dto.js';

async function findInvalidProperties(payload: object): Promise<string[]> {
  const errors = await validate(
    plainToInstance(CreateDoorToDoorReportDto, payload),
  );
  return errors.map((error) => error.property);
}

describe('CreateDoorToDoorReportDto', () => {
  it('accepts a minimal individual report', async () => {
    expect(
      await findInvalidProperties({
        role: 'individual',
        knockedDoorCount: 12,
        openedDoorCount: 4,
      }),
    ).toEqual([]);
  });

  it('requires a group name when the role is group', async () => {
    expect(
      await findInvalidProperties({
        role: 'group',
        knockedDoorCount: 12,
        openedDoorCount: 4,
      }),
    ).toEqual(['groupName']);
  });

  it('rejects negative or decimal door counts', async () => {
    expect(
      await findInvalidProperties({
        role: 'individual',
        knockedDoorCount: -1,
        openedDoorCount: 1.5,
      }),
    ).toEqual(['knockedDoorCount', 'openedDoorCount']);
  });

  it('rejects a comment longer than 500 characters and out-of-range coordinates', async () => {
    expect(
      await findInvalidProperties({
        role: 'individual',
        knockedDoorCount: 0,
        openedDoorCount: 0,
        comment: 'a'.repeat(501),
        longitude: 181,
        latitude: -91,
      }),
    ).toEqual(['comment', 'longitude', 'latitude']);
  });
});
