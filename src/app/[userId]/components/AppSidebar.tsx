import { useContext, useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MemoType } from "@/types/type";

import { AppWrapperContest } from "./AppWrapper";
import Link from "next/link";
import { PlusIcon } from "./PulsIcon";

const fetchAllMemos = async (userId: string) => {
  const res = await fetch(`/api/memos?userId=${userId}`, { cache: "no-store" });

  const data = await res.json();
  return data;
};

export const AppSidebar = () => {
  const [memos, setMemos] = useState<MemoType[]>([]);
  const user = useContext(AppWrapperContest)!;

  const getMemos = async (userId: string) => {
    const memos = await fetchAllMemos(userId);
    setMemos(memos);
  };

  useEffect(() => {
    getMemos(user?.id);
  }, [user]);

  return (
    <Sidebar className="h-screen" collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <PlusIcon size="16" />
                  <span>Add Memo</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>memos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {memos.map((memo: MemoType) => (
                <SidebarMenuItem key={memo.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`${memo.id}`}>{memo.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
