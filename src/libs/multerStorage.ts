import multer from 'multer';

const storage = multer.diskStorage({
  destination: function(req: any, file: any, cb: any) {
    cb(null, `${process.env.PWD}/storage`);
  },
  filename: function(req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

export default multer({storage: storage});
