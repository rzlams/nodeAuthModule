import { Request, Response, NextFunction } from "express"; // eslint-disable-line
import { HttpException } from "../libs/ErrorHandler";
import * as jwt from "jsonwebtoken";

interface IJWTpayload {
  username: string;
}

export class AuthController {
  private secretOrPrivateKey: jwt.Secret;

  constructor() {
    this.secretOrPrivateKey = process.env.APP_KEY as string;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = req.body;
      const fakeUser = {
        username: "admin",
        password: "password",
      };
      // Consulto a la base de datos si existe el usuario y verifico el password
      if (
        request.username === fakeUser.username &&
        request.password === fakeUser.password
      ) {
        const payload: IJWTpayload = { username: request.username };
        const accessTokenOpts: jwt.SignOptions = {
          algorithm: "HS256",
          expiresIn: 5 * 60, // entre 5 y 10min
          // scopes
          // subject: id (correo) del usuario transformado con una funcion al momento de generar el token
          // en BD se guarda el correo, esta trasnformacion es solo para generar el token.
          mutatePayload: false,
        };
        const refreshTokenOpts: jwt.SignOptions = {
          algorithm: "HS512",
          expiresIn: "1h", // or a 15 days to keep the session alive
          // verificar que se mantenga el mismo fingerprint al generar nuevos token, si cambia hacer la pregunta de seguridad
          // subject: id (correo) del usuario transformado con una funcion al momento de generar el token
          // audience: el process.env.APP_NAME o dominio del frontend. Investigar como implementar porque inhabilita el token
          mutatePayload: false,
        };

        const accessToken = jwt.sign(
          payload,
          this.secretOrPrivateKey,
          accessTokenOpts
        );

        const refreshToken = jwt.sign(
          payload,
          this.secretOrPrivateKey,
          refreshTokenOpts
        );

        const response = {
          access_token: accessToken,
          refresh_token: refreshToken,
          token_type: "Bearer",
        };
        //addRefreshTokenToList(
        //refreshToken,
        //request.username,
        //accessToken,
        //config.refreshTokenLife
        //);
        res.status(200).json(response);
      } else {
        throw new HttpException(401, "Invalid Credentials", "Unauthorized");
      }
    } catch (error) {
      next(error);
    }
  };

  public refreshTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const refreshToken: string = req.body.refresh_token;

    if (refreshToken) {
      //client.exists(refreshToken, function(err, exists) {
      //if (exists) {
      let refreshTokenPayload: IJWTpayload;

      const accessTokenOpts: jwt.VerifyOptions = {
        //algorithm: ["HS256"],
        // subject: process.env.APP_NAME as string,
        //issuer: erocess.env.APP_URL as string, // Dominio
        ignoreExpiration: false,
        clockTolerance: 30, // number of seconds to tolerate when checking the expiration
      };

      jwt.verify(
        refreshToken,
        this.secretOrPrivateKey,
        accessTokenOpts,
        function (err, decoded) {
          if (err) {
            throw new HttpException(401, err.message, "Unauthorized");
          }

          refreshTokenPayload = decoded as IJWTpayload;
          //});
        }
      );

      const payload: IJWTpayload = {
        username: refreshTokenPayload!.username,
      };

      const options: jwt.SignOptions = {
        algorithm: "HS512",
        expiresIn: 5 * 60,
        // subject: process.env.APP_NAME,
        //issuer: process.env.APP_URL, // Dominio
        jwtid: refreshTokenPayload!.username,
        mutatePayload: false,
      };

      const accessToken = jwt.sign(payload, this.secretOrPrivateKey, options);

      const response = {
        access_token: accessToken,
        expires_in: 5 * 60,
        token_type: "Bearer",
      };

      //updateRefreshTokenfromList(refreshToken, accessToken);

      res.status(200).json(response);
    } else {
      throw new HttpException(
        401,
        "The refresh token does not exist",
        "Unauthorized"
      );
    }
    //});
    //} else {
    //throw new HttpException(401, "Bad Request", "The required parameters were not sent in the request");
    //}
  };
}
