import * as mongoose from "mongoose";

export interface EventQuery {
  _id: string;
  title: String;
  description: String;
  startTime: Date;
  endTime: Date;
  location: String;
  isComplete: Boolean;
  radius: number;
}

//Event schema
const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const eventQueryModel = mongoose.model<EventQuery>("EventQuery", EventSchema);

export default eventQueryModel;
