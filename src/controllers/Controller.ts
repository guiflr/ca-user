export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>
}

export interface HttpRequest {
  body?: any
  params?: any
  query?: any
  headers?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
  headers?: Record<string, string>
}
