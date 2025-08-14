import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  content: string;
  id: string;
}

const updateMemo = async (id: string, title: string, content: string) => {
  const res = await fetch(`/api/memos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  return data;
};

export const SaveMemoButton = ({ id, title, content }: Props) => {
  const handleClick = async () => {
    await updateMemo(id, title, content);
  };

  return (
    <Button className="text-blue-400" variant="outline" onClick={handleClick}>
      Save
    </Button>
  );
};
