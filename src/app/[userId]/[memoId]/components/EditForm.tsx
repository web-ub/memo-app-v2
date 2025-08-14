import { ChangeEvent, useState } from "react";

import { MemoType } from "@/types/type";
import { MemoOptionButton } from "./MemoOptionButton";

interface Props {
  memo: MemoType;
}

export const EditForm = ({ memo }: Props) => {
  const [title, setTitle] = useState<string>(memo.title);
  const [content, setContent] = useState<string>(memo.content);

  return (
    <div className="flex flex-col w-[calc(100vw-16rem)] h-screen min-w-0 p-3">
      <div className="ml-auto">
        <MemoOptionButton id={memo.id} title={title} content={content} />
      </div>
      <form className="flex flex-col w-full h-full space-y-2">
        <input
          className="w-full text-4xl font-bold focus:outline-none"
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <textarea
          className="w-full h-full focus:outline-none"
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
      </form>
    </div>
  );
};
