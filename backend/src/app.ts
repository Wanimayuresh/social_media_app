import express from "express";
import pinoHttp from "pino-http";

import { logger } from "./config/logger";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import authRoutes from "./modules/auth/routes/auth.routes";
import profileRoutes from "./modules/user/routes/user.routes"
import { MESSAGES } from "./shared/constants/messages";
import { sendSuccess } from "./shared/helpers/response";
const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);


app.use("/api/v1",authMiddleware, profileRoutes)
app.use(
  pinoHttp({
    logger,
    customSuccessMessage: (req, res, responseTime) =>
      `${req.method} ${req.url} ${res.statusCode} ${responseTime}ms`,
    customErrorMessage: (req, res, error) =>
      `${req.method} ${req.url} ${res.statusCode} - ${error.message}`,
  }),
);

app.get("/health", (_req, res) => {
  sendSuccess(res, { status: "ok" }, MESSAGES.SERVER_HEALTHY);
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
