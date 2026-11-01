import { writeFile } from 'node:fs/promises';
import { fakerFR as faker } from '@faker-js/faker';

const OUTPUT_FILE = new URL(
  '../src/interest-points/seed/interest-points.seed.json',
  import.meta.url,
);
const OVERPASS_URLS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];
const ROUEN_CENTER = { longitude: 1.0993, latitude: 49.4431 };
const SEARCH_RADIUS_IN_METERS = 600;
const FAKER_SEED = 2026;
const STREET_TYPES = [
  'residential',
  'living_street',
  'tertiary',
  'secondary',
  'unclassified',
  'pedestrian',
];

const METERS_PER_DEGREE_OF_LATITUDE = 111_320;
const METERS_PER_DEGREE_OF_LONGITUDE =
  METERS_PER_DEGREE_OF_LATITUDE *
  Math.cos((ROUEN_CENTER.latitude * Math.PI) / 180);

type InterestPointStatus = 'favorable' | 'undecided' | 'unfavorable' | 'absent';

interface GeographicPoint {
  longitude: number;
  latitude: number;
}

interface Street {
  name: string;
  path: GeographicPoint[];
}

interface OverpassWay {
  type: 'way';
  tags?: { name?: string };
  geometry?: { lon: number; lat: number }[];
}

interface SeedInterestPoint extends GeographicPoint {
  id: string;
  status: InterestPointStatus;
  weight: number;
  label: string;
}

const STATUS_WEIGHTS: { value: InterestPointStatus; weight: number }[] = [
  { value: 'undecided', weight: 45 },
  { value: 'unfavorable', weight: 30 },
  { value: 'favorable', weight: 12 },
  { value: 'absent', weight: 13 },
];

async function requestOverpass(query: string): Promise<Response> {
  for (const overpassUrl of OVERPASS_URLS) {
    const response = await fetch(overpassUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'toktok-seed-generator/1.0',
      },
      body: new URLSearchParams({ data: query }),
    });
    if (response.ok) {
      return response;
    }
    console.warn(`${overpassUrl} a répondu ${String(response.status)}`);
  }
  throw new Error('Aucun serveur Overpass disponible.');
}

async function fetchStreets(): Promise<Street[]> {
  const query = `
    [out:json][timeout:60];
    way(around:${String(SEARCH_RADIUS_IN_METERS)},${String(ROUEN_CENTER.latitude)},${String(ROUEN_CENTER.longitude)})
      ["highway"~"^(${STREET_TYPES.join('|')})$"]["name"];
    out geom;
  `;
  const response = await requestOverpass(query);
  const { elements } = (await response.json()) as { elements: OverpassWay[] };

  const streets: Street[] = [];
  for (const way of elements) {
    if (way.tags?.name && way.geometry && way.geometry.length > 1) {
      streets.push({
        name: way.tags.name,
        path: way.geometry.map(({ lon, lat }) => ({
          longitude: lon,
          latitude: lat,
        })),
      });
    }
  }
  return streets;
}

function toMeters(point: GeographicPoint): { east: number; north: number } {
  return {
    east:
      (point.longitude - ROUEN_CENTER.longitude) *
      METERS_PER_DEGREE_OF_LONGITUDE,
    north:
      (point.latitude - ROUEN_CENTER.latitude) * METERS_PER_DEGREE_OF_LATITUDE,
  };
}

function toGeographicPoint(east: number, north: number): GeographicPoint {
  return {
    longitude: Number(
      (ROUEN_CENTER.longitude + east / METERS_PER_DEGREE_OF_LONGITUDE).toFixed(
        6,
      ),
    ),
    latitude: Number(
      (ROUEN_CENTER.latitude + north / METERS_PER_DEGREE_OF_LATITUDE).toFixed(
        6,
      ),
    ),
  };
}

function placeHousesAlongSegment(
  start: GeographicPoint,
  end: GeographicPoint,
): GeographicPoint[] {
  const startInMeters = toMeters(start);
  const endInMeters = toMeters(end);
  const eastDelta = endInMeters.east - startInMeters.east;
  const northDelta = endInMeters.north - startInMeters.north;
  const segmentLength = Math.hypot(eastDelta, northDelta);
  if (segmentLength === 0) {
    return [];
  }

  const houses: GeographicPoint[] = [];
  let distanceAlongSegment = faker.number.float({ min: 0, max: 8 });
  while (distanceAlongSegment < segmentLength) {
    const progress = distanceAlongSegment / segmentLength;
    const sideOffset =
      faker.helpers.arrayElement([-1, 1]) *
      faker.number.float({ min: 7, max: 13 });
    const east =
      startInMeters.east +
      eastDelta * progress -
      (northDelta / segmentLength) * sideOffset;
    const north =
      startInMeters.north +
      northDelta * progress +
      (eastDelta / segmentLength) * sideOffset;

    if (Math.hypot(east, north) <= SEARCH_RADIUS_IN_METERS) {
      houses.push(toGeographicPoint(east, north));
    }
    distanceAlongSegment += faker.number.float({ min: 6, max: 16 });
  }
  return houses;
}

function generateInterestPoints(streets: Street[]): SeedInterestPoint[] {
  return streets.flatMap((street) =>
    street.path.slice(1).flatMap((end, index) =>
      placeHousesAlongSegment(street.path[index], end).map((house) => ({
        id: faker.string.uuid(),
        ...house,
        status: faker.helpers.weightedArrayElement(STATUS_WEIGHTS),
        weight: faker.number.int({ min: 1, max: 5 }),
        label: `${faker.location.buildingNumber()} ${street.name}`,
      })),
    ),
  );
}

faker.seed(FAKER_SEED);
const streets = await fetchStreets();
streets.sort((first, second) => first.name.localeCompare(second.name));
const interestPoints = generateInterestPoints(streets);
await writeFile(
  OUTPUT_FILE,
  `${JSON.stringify(interestPoints, undefined, 2)}\n`,
);
console.log(
  `${String(interestPoints.length)} points générés sur ${String(streets.length)} rues.`,
);
