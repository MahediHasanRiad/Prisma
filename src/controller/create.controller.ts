import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

interface CreateType {
  email: string;
  name: string;
}

export const CreateController = async (req: Request, res: Response) => {
  try {
    const { email, name }: CreateType = req.body;

    if (!email) throw new Error("email required !!");
    if (!name) throw new Error("name required !!");

    const createUser = await prisma.user.create({
      data: {
        email,
        name
      }
    })

    res.status(200).json({ createUser });
  } catch (error) {
    console.log(error);
  }
};
