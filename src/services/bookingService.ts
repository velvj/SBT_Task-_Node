import bookingQueryModel, { BookingQuery, UserQuery } from "../models/bookings";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

class BookingService {
  //booking create
  async booking(data: BookingQuery) {
    try {
      let result = bookingQueryModel.create(data);
      return result;
    } catch (e) {
      return false;
    }
  }

  //find booking query
  async findQuery(data: any): Promise<BookingQuery> {
    try {
      let payload = {
        ...data,
      };
      let result: any = await bookingQueryModel
        .find(payload)
        .populate({ path: "participant", select: "_id userName email" })
        .populate({
          path: "event_id",
          select:
            "_id title description startTime endTime location  radius isComplete",
        });
      return result;
    } catch (e) {
      return e;
    }
  }

  //findone service
  async findOneQuery(userId: any, eventId: any): Promise<BookingQuery> {
    try {
      const result: any = await bookingQueryModel
        .findOne({ $and: [{ participant: userId }, { event_id: eventId }] })
        .populate({
          path: "event_id",
          select:
            "_id title description startTime endTime location  radius isComplete",
        })
        .populate({ path: "participant", select: "_id userName email" });
      return result;
    } catch (e) {
      return e;
    }
  }

  //findById and update service
  async findOneCancelQuery(id: any, data: BookingQuery): Promise<BookingQuery> {
    try {
      let payload = {
        status: data,
      };
      let result = await bookingQueryModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      return result;
    } catch (e) {
      return e;
    }
  }

  //display participant status
  async participantsFindQuery(data: any): Promise<BookingQuery> {
    try {
      const result: any = await bookingQueryModel.aggregate([
        {
          $match: {
            event_id: new ObjectId(data),
          },
        },
        {
          $lookup: {
            from: "userqueries",
            localField: "participant",
            foreignField: "_id",
            as: "details",
          },
        },
        {
          $unwind: "$details",
        },
        {
          $project: {
            _id: "$details._id",
            userName: "$details.userName",
            status: 1,
          },
        },
      ]);
      return result;
    } catch (e) {
      return e;
    }
  }

  //fetch user event history
  async findEventHistory(data: any): Promise<BookingQuery> {
    try {
      let payload = {
        ...data,
      };
      let result: any = await bookingQueryModel
        .find(payload)
        .populate({ path: "participant", select: "_id  " })
        .populate({
          path: "event_id",
          select:
            "_id title description startTime endTime location  radius isComplete",
        })
        .sort({ bookingDate: -1 });
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default new BookingService();
