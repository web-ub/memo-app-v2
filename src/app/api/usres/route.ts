import { NextResponse } from "next/server";

import { connect, prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: Request) => {
  try {
    const connectResponse = await connect();
    if (connectResponse) return connectResponse;

    const { username } = await req.json();

    const newUser = await prisma.user.create({ data: { username } });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(error);
  }
};
