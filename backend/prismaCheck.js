import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkPrismaConnection() {
  try {
    // Kết nối DB
    await prisma.$connect();
    console.log('✅ Prisma connected successfully!');

    // Thử query model Post
    const testPost = await prisma.post.findFirst();
    if (testPost) {
      console.log('Model Post hoạt động, tìm thấy 1 bản ghi:', testPost);
    } else {
      console.log('Model Post hoạt động, nhưng chưa có dữ liệu.');
    }

    await prisma.$disconnect();
  } catch (err) {
    console.error('❌ Prisma connection failed:', err);
  }
}

// Chạy ngay khi file chạy
checkPrismaConnection();
