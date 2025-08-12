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

    const user = await prisma.user.findFirst({ where: { id } });
    return NextResponse.json(user);
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

    const { username } = await req.json();
    const { id } = params;

    const updatedUser = await prisma.user.update({
      data: { username },
      where: { id },
    });
    return NextResponse.json(updatedUser);
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

    const deletedUser = await prisma.user.delete({ where: { id } });
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(error);
  }
};
