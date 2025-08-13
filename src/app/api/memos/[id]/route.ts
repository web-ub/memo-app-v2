import { NextResponse } from "next/server";

import { connect, prisma } from "@/lib/prisma";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { id } = await params;

    const memo = await prisma.memo.findFirst({ where: { id } });
    return NextResponse.json(memo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { title, content, userId } = await req.json();
    if (!title)
      return NextResponse.json(
        { message: "タイトルを入力してください" },
        { status: 400 }
      );
    const { id } = await params;

    const updatedMemo = await prisma.memo.update({
      data: { title, content, userId },
      where: { id },
    });
    return NextResponse.json(updatedMemo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { title, content } = await req.json();
    const { id } = await params;

    const updatedMemo = await prisma.memo.update({
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
      },
      where: { id },
    });
    return NextResponse.json(updatedMemo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { id } = await params;

    const deletedMemo = await prisma.memo.delete({ where: { id } });
    return NextResponse.json(deletedMemo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
