import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllBlogs = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 6 , topic } = req.body;
    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);

    const where = {};

    if (topic) {
      where.topic = topic;  // lọc theo topic
    }

    const blogs = await prisma.post.findMany({
      skip: (pageNumber - 1) * pageSizeNumber,
      take: pageSizeNumber,
      orderBy: [
        { pinned: 'desc' },
        { date: 'desc' }
      ],
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        date: true,
        pinned: true,
        topic: true
      }
    });

    const total = await prisma.post.count({ where });
    const totalPage = Math.ceil(total / pageSizeNumber);

    res.json({
      page: pageNumber,
      pageSize: pageSizeNumber,
      totalPage,
      topic: topic || null,
      data: blogs
    });
  } catch (err) {
    next(err);
  }
};


export const getBlogDetail = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }
    const blog = await prisma.post.findUnique({
      where: { slug }, // tìm theo slug
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        date: true,
        pinned : true
      }
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (err) {
    next(err);
  }
};export const getBlogsHome = async (req, res, next) => {
  try {
    const baseSelect = {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      date: true,
      pinned: true,
      topic: true
    };

    const pinnedBlogs = await prisma.post.findMany({
      orderBy: [
        { pinned: "desc" },
        { date: "desc" }
      ],
      take: 3,
      select: baseSelect
    });

    const kien_thucBlogs = await prisma.post.findMany({
      where: { topic: "kien_thuc" },
      orderBy: { date: "desc" },
      take: 6,
      select: baseSelect
    });

    const thu_tucBlogs = await prisma.post.findMany({
      where: { topic: "thu_tuc" },
      orderBy: { date: "desc" },
      take: 6,
      select: baseSelect
    });

    const thong_tinBlogs = await prisma.post.findMany({
      where: { topic: "thong_tin" },
      orderBy: { date: "desc" },
      take: 6,
      select: baseSelect
    });

    res.json({
      pinnedBlogs,
      kien_thucBlogs,
      thu_tucBlogs,
      thong_tinBlogs
    });

  } catch (err) {
    next(err);
  }
};