import { Request, Response, NextFunction } from "express";
import moment from "moment";

import { BaseController } from "./baseController";

import bookingService from "../services/bookingService";
import eventsService from "../services/eventsService";

//booking controller
class booking extends BaseController {
  //booking register
  async bookingEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const eID: any = req.body.event_id;
      if (!eID) {
        return (<any>res).send({
          status: 404,
          message: "Enter Valid Event ID",
        });
      }
      if (!req.body.participant) {
        return (<any>res).send({ status: 404, message: "Enter Valid user ID" });
      }
      //
      let bookingDetail: any = await bookingService.findQuery({
        participant: req.body.participant,
        event_id: req.body.event_id,
      });
      if (bookingDetail?.length > 0) {
        return (<any>res).send({
          status: 404,
          message: "You are already register the Event",
        });
      }
      //
      let bookingDetailTime: any = await bookingService.findQuery({
        participant: req.body.participant,
      });
      if (bookingDetailTime.length > 0) {
        let eventDetails: any = await eventsService.findOneEvent(eID);
        const { startTime, endTime } = eventDetails; // input event time
        let evnt: boolean = false;

        await bookingDetailTime.map(async (element: any) => {
          if (element.event_id && element.event_id.length == 0) return;
          let eventStartTime: any = element?.event_id?.startTime; // existing events
          let eventEndTime: any = element?.event_id?.endTime; // existing events
          let start1 = moment(startTime);
          let end1 = moment(endTime);

          let start2 = moment(eventStartTime);
          let end2 = moment(eventEndTime);

          if (start2.isBetween(start1, end1) || end2.isBetween(start1, end1)) {
            evnt = true;
          }
          if (new Date() >= startTime) {
            // Event is not available already completed
            const completedEventId: any = eID;
            const isComplete: any = true;
            const finishEvent = await eventsService.findByIdUpdateQuery(
              completedEventId,
              isComplete
            );
            if (finishEvent) {
              return (<any>res).send({
                status: 404,
                message: "Event already complete",
              });
            }
          }
        });
        //
        if (!evnt) {
          let data = await bookingService.booking(req.body);
          return this.success(req, res, this.status.HTTP_OK, data, "Booked");
        } else {
          return (<any>res).send({
            status: 404,
            message: "Cannot join event with overlapping timings",
          });
        }
      } else {
        let data = await bookingService.booking(req.body);
        return this.success(req, res, this.status.HTTP_OK, data, "Booked");
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

  //cancel Event
  async cancelBookedEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: any = req.body.participant;
      const eventId: any = req.body.event_id;
      if (!userId || !eventId) {
        return this.success(
          req,
          res,
          this.status.HTTP_BAD_REQUEST,
          "Provide the valid ID"
        );
      }
      const data: any = await bookingService.findOneQuery(userId, eventId);
      if (!data) {
        return this.errors(
          req,
          res,
          this.status.HTTP_BAD_REQUEST,
          "No Booking here!"
        );
      }
      let hours = moment(data.event_id.startTime).diff(
        moment(new Date()),
        "hours"
      );

      if (hours >= 8) {
        let bookingId = data._id;
        let status: any = "cancelled";
        let eventCancel = await bookingService.findOneCancelQuery(
          bookingId,
          status
        );
        return this.success(
          req,
          res,
          this.status.HTTP_OK,
          eventCancel,
          "Booking Cancelled successfully"
        );
      } else {
        return this.errors(
          req,
          res,
          this.status.HTTP_BAD_REQUEST,
          "Cancellation FAILED!"
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

  //event participants detail
  async getParticipants(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = req.params.id;
      let data = await bookingService.participantsFindQuery(eventId);
      return this.success(
        req,
        res,
        this.status.HTTP_OK,
        data,
        "Participant Details viewed successfully"
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

  //event History details
  async eventHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const participantId: any = req.params.id;
      let data: any = await bookingService.findEventHistory({
        participant: participantId,
      });

      const pastEvents = [];
      const currentEvents = [];
      const futureEvents = [];
      for (let event of data) {
        if (event.event_id.endTime < new Date()) {
          pastEvents.push(event);
        } else if (event.event_id.endTime > new Date()) {
          futureEvents.push(event);
        } else if (
          event.event_id.startTime < new Date() &&
          event.event_id.endTime > new Date()
        ) {
          currentEvents.push(event);
        }
      }

      return this.success(
        req,
        res,
        this.status.HTTP_OK,
        {
          futureEvents: futureEvents,
          currentEvent: currentEvents,
          pastEvent: pastEvents,
        },
        "Event History of users"
      );
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }
}

export default new booking();
