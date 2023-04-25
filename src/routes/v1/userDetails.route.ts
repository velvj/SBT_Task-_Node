import { Router } from "express";
const userRoutes = Router();

import userDetails from "../../controllers/userDetails.controller";
import Authenticate from "../../middleware/authentication";

userRoutes.post("/signup", (req, res, next) =>
  userDetails.userData(req, res, next)
);
userRoutes.post("/login", (req, res, next) =>
  userDetails.loginData(req, res, next)
);
userRoutes.get("/getuser", Authenticate.authenToken, (req, res, next) =>
  userDetails.findUserData(req, res, next)
);

export default userRoutes;
