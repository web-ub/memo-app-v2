import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlusIcon } from "./PulsIcon";

const addMemo = async (
  title: string | undefined,
  userId: string | undefined
) => {
  const res = await fetch(`/api/memos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content: "", userId }),
  });

  const data = await res.json();
  return data;
};

export const AddMemoButton = () => {
  const userId = String(useParams().userId);

  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(1, "Please enter title"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newMemo = await addMemo(values.title, userId);

    const { id } = newMemo;
    router.push(`/${userId}/${id}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex bg-blue-300">
          <PlusIcon size="16" />
          <span>Create Memo</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-blue-50">
        <DialogHeader>
          <DialogTitle className="text-center text-blue-300 text-shadow-2xs text-2xl">
            Create Memo
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col items-center justify-center space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-300">Memo Title</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="memo title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Create Memo</button>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-red-400">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
