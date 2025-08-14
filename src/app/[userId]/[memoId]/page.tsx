"use client";

import { MemoType } from "@/types/type";
import { useParams } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import { EditForm } from "./components/EditForm";

const fetchMemo = async (id: string) => {
  const res = await fetch(`/api/memos/${id}`, { cache: "no-store" });

  const data = await res.json();
  return data;
};

export const PageContext = createContext<string>("");

export default function Page() {
  const { userId, memoId } = useParams();
  const [memo, setMemo] = useState<MemoType>();

  const getMemo = useCallback(async () => {
    const memo = await fetchMemo(String(memoId));

    setMemo(memo);
  }, [memoId]);

  useEffect(() => {
    getMemo();
  }, [getMemo]);

  return (
    <PageContext.Provider value={String(userId)}>
      {memo && <EditForm memo={memo!} />}
    </PageContext.Provider>
  );
}
