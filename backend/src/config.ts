export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5433,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'rsvp_db',
  },
  cors: {
    allowedOrigins: process.env.CORS_ALLOWED_ORIGINS || '*',
  },
};