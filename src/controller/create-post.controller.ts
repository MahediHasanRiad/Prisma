import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js";

interface PostType {
  title: string;
  content?: string;
}

export const CreatePostController = async (req: Request, res: Response) => {
  try {
    const {title, content}: PostType = req.body
    const id = req.user?.id
    if(!id) throw new Error('invalid token !!!')

    if(!title) throw new Error('title are required !!!')

    const createPost = await prisma.post.create({
      data: {
        title,
        content: content || '',
        author: {     
          connect: {id: id}   // author ref
        }
      }
    })

    res.status(201).json(createPost)

  } catch (error) {
    console.log(error)
  }
}