import { useRouter } from "next/navigation";
import { useContext } from "react";

import { Button } from "@/components/ui/button";

import { AppWrapperContest } from "../../components/AppWrapper";
import { PageContext } from "../page";

interface Props {
  id: string;
}

const deleteMemo = async (id: string) => {
  const res = await fetch(`/api/memos/${id}`, { method: "DELETE" });

  const data = await res.json();
  return data;
};

export const DeleteMemoButton = ({ id }: Props) => {
  const userId = useContext(PageContext);
  const { getMemos } = useContext(AppWrapperContest)!;
  const router = useRouter();

  const handleClick = async () => {
    await deleteMemo(id);

    await getMemos(userId);
    router.push(`/${userId}`);
  };

  return (
    <Button className="text-red-400" variant="outline" onClick={handleClick}>
      Delete
    </Button>
  );
};
