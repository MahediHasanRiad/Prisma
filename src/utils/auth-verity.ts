import type { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { prisma } from "../lib/prisma.js"

export const AuthVerity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if(!token) throw new Error('Token not found !!!')

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as string) as {id: number}

    const user = await prisma.user.findUnique({where: {id: decoded.id}})
    if(!user) throw new Error('invalid token !!!')

    req.user = user

    next()
  } 
  catch (error) {
    console.log(error)
  }
}