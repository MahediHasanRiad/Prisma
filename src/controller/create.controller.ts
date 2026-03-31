import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { HashPassword } from "../utils/password.js";

interface CreateType {
  email: string;
  name: string;
  password: string;
}

export const CreateController = async (req: Request, res: Response) => {
  try {
    const { email, name, password }: CreateType = req.body;

    if (!email) throw new Error("email required !!");
    if (!name) throw new Error("name required !!");
    if (!password) throw new Error("password required !!!");

    // hash password
    const hashPassword = await HashPassword(password)

    const createUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword
      },
    });

    res.status(200).json({ createUser });
  } 
  catch (error) {
    console.log(error);
  }
};
