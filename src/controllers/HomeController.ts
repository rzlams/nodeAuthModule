import {Request, Response, NextFunction} from 'express'; // eslint-disable-line

class HomeController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    res.status(204);
  };
}

export default new HomeController();
