import express from 'express';
import upload from '../libs/multerStorage';
import HomeController from '../controllers/HomeController';
import TestController from '../controllers/TestController';
import PruebaController from '../controllers/PruebaController';

const router = express.Router(); // eslint-disable-line

router.get('/favicon.ico', HomeController.index);

router.get('/upload', TestController.uploadView);
router.post('/upload', upload.any(), TestController.upload);

router.get('/:path?', PruebaController.downloadView);

export default router;
