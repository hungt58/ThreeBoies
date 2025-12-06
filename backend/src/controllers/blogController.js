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
};
