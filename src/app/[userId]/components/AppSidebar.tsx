import { useRouter } from "next/navigation";
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
import { OptionButton } from "./OptionButton";

const fetchAllMemos = async (userId: string) => {
  const res = await fetch(`/api/memos?userId=${userId}`, { cache: "no-store" });

  const data = await res.json();
  return data;
};

export const AppSidebar = () => {
  const [memos, setMemos] = useState<MemoType[]>([]);
  const user = useContext(AppWrapperContest)!;

  const router = useRouter();

  const getMemos = async (userId: string) => {
    const memos = await fetchAllMemos(userId);
    setMemos(memos);
  };

  useEffect(() => {
    getMemos(user?.id);
  }, [user]);

  return (
    <Sidebar className="h-screen pt-2" collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <OptionButton />
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
                    <span onClick={() => router.push(`/${user.id}/${memo.id}`)}>
                      {memo.title}
                    </span>
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
