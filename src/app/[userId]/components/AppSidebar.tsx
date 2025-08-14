import { useRouter } from "next/navigation";
import { useContext } from "react";

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

interface Props {
  memos: MemoType[];
}

export const AppSidebar = ({ memos }: Props) => {
  const { user } = useContext(AppWrapperContest)!;

  const router = useRouter();

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
                    <span onClick={() => router.push(`/${user?.id}/${memo.id}`)}>
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
