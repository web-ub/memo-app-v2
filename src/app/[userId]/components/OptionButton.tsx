import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { OptionIcon } from "./OptionIcon";
import { AddMemoButton } from "./AddMemoForm";

export const OptionButton = () => {
  return (
    <div className="pl-50">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <OptionIcon size="24" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <AddMemoButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
