import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteMemoButton } from "./DeleteMemoButton";
import { MemoOptionIcon } from "./MemoOptionIcon";
import { SaveMemoButton } from "./SaveMemoButton";

interface Props {
  id: string;
  title: string;
  content: string;
}

export const MemoOptionButton = ({ id, title, content }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MemoOptionIcon size="24" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col space-y-2 p-2 bg-gray-200">
        <DropdownMenuItem asChild>
          <SaveMemoButton id={id} title={title} content={content} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteMemoButton id={id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
