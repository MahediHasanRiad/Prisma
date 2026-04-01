import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js";

interface UpdateType {
  title?: string;
  content?: string;
  published?: boolean
}

export const UpdatePostController = async (req: Request, res: Response) => {
  try {
    const {title, content, published}: UpdateType = req.body 
    const id = req.params.id as string

    const updated: UpdateType = {}

    if(title !== undefined) updated.title = title;
    if(content !== undefined) updated.content = content;
    if(published !== undefined) updated.published = published;

    const parseId = parseInt(id)
    const post = await prisma.post.update({
      where: {id: parseId},
      data: updated
    })

    res.status(200).json(post)

  } catch (error) {
    console.log(error)
  }
}