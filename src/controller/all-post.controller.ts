import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js";

interface QueryType {
  page?: string;
  limit?: string;
  sortBy?: string;
  search?: string;
}

export const AllPostController = async (req: Request, res: Response) => {
  try {
    const {page = '1', limit = '10', sortBy = 'asc', search = ''}: QueryType = req.query 

    const pageNum = parseInt(page)
    const pageLimit = parseInt(limit)

    const skipPage = (pageNum - 1) * pageLimit

    const allpost = await prisma.post.findMany({
      where: {
        title: {contains: search, mode: 'insensitive'}
      },
      orderBy: {
        title: sortBy as 'asc' | 'desc'
      },
      skip: skipPage,
      take: pageLimit
    })


    // get total number of post
    const totalPost = await prisma.post.count({
      where: {
        title: {contains: search, mode: 'insensitive'}
      }
    })

    res.status(200).json({allpost, 'total-post': totalPost})

  } catch (error) {
    console.log(error)
  }
}