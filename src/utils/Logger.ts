import winston from "winston";
import { env } from "../configs/env";

const Log = winston.createLogger({
  level: env.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.label({ label: env.logs.label }),
    winston.format.printf(({ timestamp, level, label, message }) => {
      return `${timestamp} ${level.toUpperCase()} [${label}] : ${message}`; // log 출력 포맷 정의
    })
  ),
  transports: new winston.transports.Console(),
});

export default Log;
