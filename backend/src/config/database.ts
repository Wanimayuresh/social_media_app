import { Pool } from 'pg';

import { env } from './env';

// Supply your PostgreSQL credentials
export const pool = new Pool({
    host: env.DB_HOST, // Your default database username
    port: env.DB_PORT,         // Server hosting your database
    user: env.DB_USER,// Name of the database you created
    password: env.DB_PASSWORD,// Your database password
    database: env.DB_NAME,// Default PostgreSQL port                
});

