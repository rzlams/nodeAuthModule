import express from "express";
import {
  AuthController,
  TestController,
  PruebaController,
} from "../controllers";

const router = express.Router(); // eslint-disable-line

//router.get("/favicon.ico", AuthController.login);
router.get("/auth/login", AuthController.login);
router.get("/auth/refresh", AuthController.refreshTokens);

router.get("/upload", TestController.uploadView);
router.post("/upload", TestController.upload);

router.get("/:path?", PruebaController.downloadView);

export default router;
