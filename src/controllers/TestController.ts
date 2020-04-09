import {Request, Response, NextFunction} from 'express'; // eslint-disable-line

class TestController {
/*
  public preRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log('entro en el middleware');
    next();
  }

  preRequest();
*/
  public uploadView = (req: Request, res: Response, next: NextFunction) => {
    res.render('upload');
  };

  public upload = (req: Request, res: Response, next: NextFunction) => {
    res.redirect('/upload');
  };
}

export default new TestController();
