import {Request, Response, NextFunction} from 'express'; // eslint-disable-line
import getDirContent from '../libs/getDirContent';

class PruebaController {
  private previewPath: string;
  private files: string[];
  private dirs: string[];
  private currentPath: string;

  constructor() {
    this.previewPath = '';
    this.files = [];
    this.dirs = [];
    this.currentPath = '';
  }

  public downloadView = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.path) {
      if (req.params.path === 'back') {
        if (this.previewPath.split('/').length >= 3) {
          const end = this.previewPath.lastIndexOf('/');
          this.currentPath = this.previewPath.substring(0, end);
        } else {
          this.currentPath = '/';
        }
      } else {
        this.currentPath = `${this.previewPath}/${req.params.path}`;
      }
    } else {
      this.currentPath = '/';
    }

    if (this.files.indexOf(req.params.path) >= 0) {
      res.download(this.currentPath);
      return;
    }

    this.previewPath = this.currentPath === '/' ? '' : this.currentPath;
    this.files = getDirContent(this.currentPath).files;
    this.dirs = getDirContent(this.currentPath).dirs;
    res.render('index', {
      files: this.files,
      dirs: this.dirs,
    });
  };
}

export default new PruebaController();
