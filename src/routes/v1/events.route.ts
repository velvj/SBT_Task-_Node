import { Router } from "express";
const eventRoutes = Router();

import eventDetails from "../../controllers/events.controller";
import Authenticate from "../../middleware/authentication";

eventRoutes.post("/eventOrganize", (req, res, next) =>
  eventDetails.eventData(req, res, next)
);
eventRoutes.get("/eventsDetails", Authenticate.authenToken, (req, res, next) =>
  eventDetails.eventDetails(req, res, next)
);

export default eventRoutes;
