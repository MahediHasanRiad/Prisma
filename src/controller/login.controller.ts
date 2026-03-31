import "dotenv/config";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { comparePassword } from "../utils/password.js";
import jwt from "jsonwebtoken";

interface LoginType {
  email: string;
  password: string;
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginType = req.body;

    if (!email) throw new Error("Email required !!!");
    if (!password) throw new Error("Password Required !!!");

    const findUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!findUser) throw new Error("user not found !!!");

    // comapre password
    const pass = await comparePassword(password, findUser?.password);
    if (!pass) throw new Error("invalid password !!!");

    // generate token
    const token = jwt.sign(
      {
        id: findUser.id,
        name: findUser.name,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: "1d" },
    );

    // option for cookies
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // ১ দিনের জন্য (মিলি-সেকেন্ডে)
    };

    // response
    res.cookie("accessToken", token).status(200).json({message: 'success', findUser, token})

  } catch (error) {
    console.log(error);
  }
};
