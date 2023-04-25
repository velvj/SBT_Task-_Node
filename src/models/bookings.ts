import * as mongoose from "mongoose";

export interface UserQuery {
  _id: string;
  userName: String;
  email: String;
  password: String;
}
export interface EventQuery {
  _id: string;
  title: String;
  description: String;
  startTime: String;
  endTime: String;
  location: String;
}

export interface BookingQuery {
  _id: string;
  participant: UserQuery[];
  status: string;
  event_id: EventQuery[];
}

//booking schema
const bookingQuerySchema = new mongoose.Schema(
  {
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserQuery",
      required: true,
    },
    status: {
      type: String,
      enum: ["going", "cancelled"],
      default: "going",
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "EventQuery",
    },
    bookingDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

const bookingQueryModel = mongoose.model<BookingQuery>(
  "BookingQuery",
  bookingQuerySchema
);

export default bookingQueryModel;
