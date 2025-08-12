import { NextResponse } from "next/server";

import { connect, prisma } from "@/lib/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { id } = params;

    const memo = await prisma.memo.findFirst({ where: { id } });
    return NextResponse.json(memo);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { title, content, userId } = await req.json();
    if (!title)
      return NextResponse.json({ message: "タイトルを入力してください" });
    const { id } = params;

    const updatedMemo = await prisma.memo.update({
      data: { title, content, userId },
      where: { id },
    });
    return NextResponse.json(updatedMemo);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { title, content } = await req.json();
    const { id } = params;

    const updatedMemo = await prisma.memo.update({
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
      },
      where: { id },
    });
    return NextResponse.json(updatedMemo);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { id } = params;

    const deletedMemo = await prisma.memo.delete({ where: { id } });
    return NextResponse.json(deletedMemo);
  } catch (error) {
    return NextResponse.json(error);
  }
};
