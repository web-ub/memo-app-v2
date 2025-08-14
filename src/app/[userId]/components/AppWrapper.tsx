"use client";

import { useParams } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { MemoType, UserType } from "@/types/type";

import { AppSidebar } from "./AppSidebar";

const fetchUser = async (userId: string) => {
  const res = await fetch(`/api/users/${userId}`, { cache: "no-store" });

  const data = await res.json();
  return data;
};

const fetchAllMemos = async (userId: string) => {
  const res = await fetch(`/api/memos?userId=${userId}`, { cache: "no-store" });

  const data = await res.json();
  return data;
};

export const AppWrapperContest = createContext<{
  user: UserType | undefined;
  getMemos: (id: string) => Promise<void>;
} | null>(null);

export const AppWrapper = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [user, setUser] = useState<UserType>();
  const [memos, setMemos] = useState<MemoType[]>([]);
  const { userId } = useParams();

  const getUser = async (userId: string) => {
    const user = await fetchUser(userId);
    setUser(user);
  };

  const getMemos = async (userId: string) => {
    const memos = await fetchAllMemos(userId);
    setMemos(memos);
  };

  useEffect(() => {
    getUser(String(userId));
    getMemos(String(userId));
  }, [userId]);

  return (
    <AppWrapperContest.Provider value={{user, getMemos}}>
      <SidebarProvider>
        <AppSidebar memos={memos} />
        <div>{userId ? <div>{children}</div> : <div>Loading</div>}</div>
      </SidebarProvider>
    </AppWrapperContest.Provider>
  );
};
