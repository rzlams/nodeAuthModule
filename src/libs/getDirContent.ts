import {readdirSync} from 'fs';

const getDirContent = <T>(source: any): any => {
  const content: any = readdirSync(source, {withFileTypes: true});

  const dirs = content
      .filter(<T>(path: any) => path.isDirectory())
      .map(<T>(path: any) => path.name);

  const files: any = content
      .filter(<T>(path: any) => path.isFile())
      .map(<T>(path: any) => path.name);

  return {dirs, files};
};

export default getDirContent;
