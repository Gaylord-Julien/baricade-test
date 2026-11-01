export class ApiError extends Error {
  readonly status: number

  constructor(status: number, path: string) {
    super(`Request to ${path} failed with status ${String(status)}`)
    this.name = 'ApiError'
    this.status = status
  }
}

const jsonHeaders = { 'Content-Type': 'application/json' }

async function requestJson<ResponseBody>(
  path: string,
  init: RequestInit = {},
): Promise<ResponseBody> {
  const response = await fetch(path, init)
  if (!response.ok) {
    throw new ApiError(response.status, path)
  }
  return (await response.json()) as ResponseBody
}

export function getJson<ResponseBody>(
  path: string,
  signal?: AbortSignal,
): Promise<ResponseBody> {
  return requestJson<ResponseBody>(path, signal ? { signal } : {})
}

export function postJson<ResponseBody>(
  path: string,
  body: unknown,
): Promise<ResponseBody> {
  return requestJson<ResponseBody>(path, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(body),
  })
}
