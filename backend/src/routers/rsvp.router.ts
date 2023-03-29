import express from 'express';
import { handleRsvp } from '../controllers/rsvp.controller';

const rsvpRouter = express.Router();

rsvpRouter.post('/', handleRsvp);

export default rsvpRouter;