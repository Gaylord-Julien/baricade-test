import { describe, expect, it } from 'vitest';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  it('reports the API as healthy', () => {
    expect(new HealthController().check()).toEqual({ status: 'ok' });
  });
});
