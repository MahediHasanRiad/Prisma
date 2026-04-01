import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js";

export const DeletePostController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if(!id) throw new Error('params id not found !!!')

    const parstId = parseInt(id)
    await prisma.post.delete({where: {id: parstId}})

    res.status(200).json({message: 'successfully deleted'})
    
  } catch (error) {
    console.log(error)
  }
}