// import "dotenv/config";
import path from "path";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "../../.env-prod") });
} else if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: path.join(__dirname, "../../.env-dev") });
} else {
  throw new Error("process.env.NODE_ENV를 설정하지 않았습니다!");
}

/**
 * 환경 변수
 */
export const env = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",

  app: {
    port: Number(process.env.PORT) || 3000,
    domain: process.env.DOMAIN,
    apiPrefix: process.env.API_PREFIX || "/api",
    jwtAccessSecret: process.env.JWT_SECRET_ACCESS_KEY,
    jwtRefreshSecret: process.env.JWT_SECRET_REFRESH_KEY,
    sessionKey: process.env.SESSION_KEY,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  logs: {
    level: process.env.LOG_LEVEL || "info",
    label: process.env.LOG_LABEL || "unlike",
  },
  // 외부 API KEY
  api: {},
};
