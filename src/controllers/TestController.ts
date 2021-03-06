import { Request, Response, NextFunction } from "express"; // eslint-disable-line

export class TestController {
  /*
 * Intento de Cargar un middleware para un controlador

  public preRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log('entro en el middleware');
    next();
  }

  preRequest();
*/
  public async uploadView(req: Request, res: Response, next: NextFunction) {
    try {
      res.render("upload");
    } catch (error) {
      next(error);
    }
  }

  public async upload(req: Request, res: Response, next: NextFunction) {
    try {
      res.redirect("/upload");
    } catch (error) {
      next(error);
    }
  }
}
