import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../controllers/Controller'

export const expressAdapter = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers
    }

    try {
      const httpResponse = await controller.handle(httpRequest)

      if (httpResponse.headers) {
        res.set(httpResponse.headers)
      }

      res.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
