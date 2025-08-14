import { ChangeEvent, useState } from "react";

import { MemoType } from "@/types/type";

interface Props {
  memo: MemoType;
}

export const EditForm = ({ memo }: Props) => {
  const [title, setTitle] = useState<string>(memo.title);
  const [content, setContent] = useState<string>(memo.content);

  return (
    <div className="flex w-[calc(100vw-16rem)] h-screen p-2">
      <form className="flex flex-col w-full space-y-2">
        <input
          className="w-full text-4xl focus:outline-none"
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
