import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

import { UserType } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface Props {
  users: UserType[];
}

export const LogInForm = ({ users }: Props) => {
  const router = useRouter();

  const usernames = users.map((user: UserType) => user.username);

  const formSchema = z.object({
    username: z.enum(usernames, "That username doesn't exist"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const user = users.filter(
      (user: UserType) => user.username === values.username
    )[0];

    router.push(`/${user.id}`);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-green-400">Log in</DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center bg-green-50">
        <DialogHeader>
          <DialogTitle className="text-green-400 font-bold text-2xl">
            Log in
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col items-center justify-center space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input
                      className="border-green-300 bg-white"
                      placeholder="username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-green-400" type="submit">
              Log in
            </Button>
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
