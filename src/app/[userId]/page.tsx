"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const { userId } = useParams();

  return <div>{userId}</div>;
}
