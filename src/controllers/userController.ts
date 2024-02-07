import { UserModel, UserDoc } from "../models/User";

export async function createUser(user: UserDoc) {
  const newUser = await UserModel.create(user);
  return newUser;
}

export async function findUserByEmail(email: string) {
  const user = await UserModel.findOne({ email });
  return user;
}
