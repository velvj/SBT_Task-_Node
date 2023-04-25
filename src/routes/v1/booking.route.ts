import { Router } from "express";
const bookingRoutes = Router();

import bookingControll from "../../controllers/booking.controller";
import Authenticate from "../../middleware/authentication";

bookingRoutes.post(
  "/eventBooking",
  Authenticate.authenToken,
  (req, res, next) => bookingControll.bookingEvent(req, res, next)
);
bookingRoutes.put("/cancelEvent", Authenticate.authenToken, (req, res, next) =>
  bookingControll.cancelBookedEvent(req, res, next)
);
bookingRoutes.get("/eventParticipants/:id", (req, res, next) =>
  bookingControll.getParticipants(req, res, next)
);
bookingRoutes.get(
  "/eventHistory/:id",
  Authenticate.authenToken,
  (req, res, next) => bookingControll.eventHistory(req, res, next)
);

export default bookingRoutes;
