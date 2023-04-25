import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { BaseController } from "./baseController";
import userService from "../services/userService";
import { generateToken } from "../utils/authToken";
import e from "cors";

//user controller
class UserDetails extends BaseController {
  //create registration
  async userData(req: Request, res: Response, next: NextFunction) {
    try {
      const userExist = await userService.findUserQuery({
        email: req.body.email,
      });
      if (userExist) {
        return this.errors(
          req,
          res,
          this.status.HTTP_BAD_REQUEST,
          "User Already exists"
        );
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      let data = await userService.addUser(req.body);
      return this.success(req, res, this.status.HTTP_OK, data, "Added");
    } catch (e) {
      this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
      next(e);
    }
  }

  //login user
  async loginData(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email);
      let hash: string = result.password as string;
      const passCheck = await bcrypt.compare(password, hash);
      if (passCheck) {
        const token = await generateToken(result._id);
        return this.success(
          req,
          res,
          this.status.HTTP_OK,
          token,
          "Login Successfully"
        );
      } else {
        return this.success(
          req,
          res,
          this.status.HTTP_BAD_REQUEST,
          "Password does not match!"
        );
      }
    } catch (e) {
      this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
      next(e);
    }
  }

  //user detail
  async findUserData(req: Request, res: Response, next: NextFunction) {
    try {
      // let userIdData: any = req.params.id;
      let userIdData: any = (<any>req).userToken.id;
      const result = await userService.findUserQuery({ _id: userIdData });
      return this.success(req, res, this.status.HTTP_OK, result, "User Detail");
    } catch (e) {
      this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
    next(e);
  }
}

export default new UserDetails();
