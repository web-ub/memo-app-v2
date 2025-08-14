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

    const user = await prisma.user.findFirst({ where: { id } });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { username } = await req.json();
    const { id } = await params;

    const updatedUser = await prisma.user.update({
      data: { username },
      where: { id },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
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

    const deletedUser = await prisma.user.delete({ where: { id } });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
