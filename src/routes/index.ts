import { Express } from "express";
// import healthCheck from "./v1/healthCheck.route";

import userDetails from "./v1/userDetails.route";
import event from "./v1/events.route";
import booking from "./v1/booking.route";

const initializeRoutes = (app: Express) => {
  console.log("inside route");
  // Routes
  app.use("/user", userDetails);
  app.use("/event", event);
  app.use("/booking", booking);
};

export default initializeRoutes;
