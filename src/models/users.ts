import * as mongoose from "mongoose";

//interface query
export interface UserQuery {
  _id: string;
  userName: String;
  email: String;
  password: String;
}

//user schema
const userQuerySchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userQueryModel = mongoose.model<UserQuery>("UserQuery", userQuerySchema);

export default userQueryModel;
