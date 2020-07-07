export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT: string;
      PWD: string;
      APP_KEY: string;
      DB_CONNECTION: string;
    }
  }
}
