import { users } from "@prisma/client";
import {prisma} from "../config/database.js";

export type CreateUserData = Omit<users, "id">;

export async function findByEmail(email: string) {
  const user = await prisma.users.findFirst({ where: { email } });
  return user;
}

export async function insert(UserData: CreateUserData) {
  await prisma.users.create({ data: UserData});
}