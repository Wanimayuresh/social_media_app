import app from "./app";
import { pool } from "./config/database";
import { env } from "./config/env";
import { logger } from "./config/logger";

async function startServer() {
  try {
    await pool.query("SELECT 1");

    logger.info("Database connected");
    logger.info(env.DB_NAME);
    app.listen(env.PORT, () => {
      logger.info(`Server listening on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
startServer()