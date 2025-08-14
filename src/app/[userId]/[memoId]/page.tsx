"use client";

import { MemoType } from "@/types/type";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { EditForm } from "./components/EditForm";

const fetchMemo = async (id: string) => {
  const res = await fetch(`/api/memos/${id}`, { cache: "no-store" });

  const data = await res.json();
  return data;
};

export default function Page() {
  const { memoId } = useParams();
  const [memo, setMemo] = useState<MemoType>();

  const getMemo = useCallback(async () => {
    const memo = await fetchMemo(String(memoId));

    setMemo(memo);
  }, [memoId]);

  useEffect(() => {
    getMemo();
  }, [getMemo]);

  return <div>{memo && <EditForm memo={memo!} />}</div>;
}
