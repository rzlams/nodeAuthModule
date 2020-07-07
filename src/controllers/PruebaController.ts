import { Request, Response, NextFunction } from "express"; // eslint-disable-line

export class PruebaController {
  constructor() {}

  public async downloadView(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
