"use client";

import { useParams } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { UserType } from "@/types/type";

import { AppSidebar } from "./AppSidebar";

const fetchUser = async (userId: string) => {
  const res = await fetch(`/api/users/${userId}`, { cache: "no-store" });

  const data = await res.json();
  return data;
};

export const AppWrapperContest = createContext<UserType | null>(null);

export const AppWrapper = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [user, setUser] = useState<UserType>();
  const { userId } = useParams();

  const getUser = async (userId: string) => {
    const user = await fetchUser(userId);
    setUser(user);
  };

  useEffect(() => {
    getUser(String(userId));
  }, [userId]);

  return (
    <AppWrapperContest.Provider value={user!}>
      <SidebarProvider>
        <AppSidebar />
        <div>
          <div>{children}</div>
        </div>
      </SidebarProvider>
    </AppWrapperContest.Provider>
  );
};
