import { NextResponse } from "next/server";

import { connect, prisma } from "@/lib/prisma";

export const GET = async (req: Request) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const memos = await prisma.memo.findMany({
      where: { userId: userId ?? undefined },
    });
    return NextResponse.json(memos, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { title, content, userId } = await req.json();
    if (!title)
      return NextResponse.json(
        { message: "タイトルを入力してください" },
        { status: 400 }
      );

    const newMemo = await prisma.memo.create({
      data: { title, content, userId },
    });
    return NextResponse.json(newMemo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
