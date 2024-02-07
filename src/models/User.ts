import { Schema, model, Document } from "mongoose";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface UserDoc extends Document {
  userName: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<UserDoc>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<UserDoc>("User", userSchema);
