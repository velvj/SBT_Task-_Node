import { Request, Response, NextFunction } from "express";

import { BaseController } from "./baseController";
import eventService from "../services/eventsService";

//Event controller
class EventDetail extends BaseController {
  
  //Event create
  async eventData(req: Request, res: Response, next: NextFunction) {
    try {
      if (new Date(req.body.startTime) < new Date()) {
        return this.errors(
          req,
          res,
          this.status.HTTP_BAD_REQUEST,
          "Enter the proper Date"
        );
      }
      let data = await eventService.event(req.body);
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

  //event detail
  async eventDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const data: any = await eventService.findEvent();
      const radiusData = await data.filter((ele: any) => {
        return ele.radius <= 30;
      });
      return this.success(
        req,
        res,
        this.status.HTTP_OK,
        radiusData,
        "Event Details viewed successfully"
      );
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
}

export default new EventDetail();
