import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import rsvpRouter from './routers/rsvp.router';
import { sequelize } from './database';
import { config } from './config';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });

app.use('/rsvp', rsvpRouter);

sequelize.sync().then(() => {
  app.listen(config.server.port, () => {
    console.log(`Server started on port ${config.server.port}`);
  });
});