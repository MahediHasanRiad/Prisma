import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"

export const FindSinglePost = async(req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    if(!id) throw new Error('param id not found')

    const parstId = parseInt(id)
    const getPost = await prisma.post.findUnique({where: {id: parstId}})

    if(!getPost) throw new Error('post not found')

    res.status(200).json(getPost)

  } catch (error) {
    console.log(error)
  }
}