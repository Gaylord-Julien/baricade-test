export interface AppConfig {
  port: number;
}

const DEFAULT_PORT = 3001;

function parsePort(rawPort: string | undefined): number {
  if (rawPort === undefined || rawPort.trim() === '') {
    return DEFAULT_PORT;
  }
  const port = Number(rawPort);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }
  return port;
}

export function loadAppConfig(): AppConfig {
  return { port: parsePort(process.env.PORT) };
}
