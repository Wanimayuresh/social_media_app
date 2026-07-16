import pino, { type LoggerOptions } from "pino";

import { env, isDevelopment } from "./env";

const options: LoggerOptions = { level: env.LOG_LEVEL };

if (isDevelopment) {
  options.transport = {
    target: "pino-pretty",
    options: { colorize: true, translateTime: "SYS:standard", ignore: "pid,hostname" },
  };
}

export const logger = pino(options);
