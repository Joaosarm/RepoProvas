import * as authRepository from "../repositories/authRepository.js"
import bcrypt from "bcrypt";

export async function checkUserExistance(email: string) {
  const exists = await authRepository.findByEmail(email)
  if (exists) {
    throw {
      type: "Invalid requisition",
      message: "Email already registered",
      status: 409
    }
  }
}

export async function getUser(email: string) {
  const user = await authRepository.findByEmail(email)
  if (!user) {
    throw {
      type: "Invalid requisition",
      message: "Wrong infos",
      status: 422
    }
  }
  return user;
}

export async function checkPassword(password : string, DBpassword : string) {
  const verified = bcrypt.compareSync(password, DBpassword);
  if (!verified) {
    throw {
      type: "Invalid requisition",
      message: "Wrong infos",
      status: 422
    }
  }
}