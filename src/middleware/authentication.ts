import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authToken";
import userService from "../services/userService";

//Token Authenticate
class Authenticate {
  async authenToken(req: any, res: Response, next: NextFunction) {
    try {
      const token = req.headers["x-auth"];
      if (!token) {
        return res.status(404).json({
          status: 404,
          message: " Provide the token",
          data: [],
        });
      }

      const data = await verifyToken(token);
      let userToken: any;
      if (data) userToken = await userService.findUserQuery({_id:data});
      if (!data || !userToken)
        return res.status(400).json({
          status: 400,
          message: "Invalid or Expired Token",
          data: [],
        });
      (<any>req).userToken = data;
      return next();
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: e.message,
        data: [],
      });
    }
  }
}

export default new Authenticate();
