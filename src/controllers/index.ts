import { AuthController as Home } from "./AuthController";
import { PruebaController as Prueba } from "./PruebaController";
import { TestController as Test } from "./TestController";

export const AuthController = new Home();
export const PruebaController = new Prueba();
export const TestController = new Test();
