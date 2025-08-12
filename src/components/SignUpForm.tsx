export const SignInForm = () => {
  return (
    <button className="text-blue-400" type="button">
      Sign in
    </button>
  );
};
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

const addUser = async (username: string) => {
  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  return await res.json();
};

export const SignUpForm = ({ users }: Props) => {
  const router = useRouter();

  const usernames = users.map((user: UserType) => user.username);

  const formSchema = z.object({
    username: z
      .string()
      .min(1, "Please enter new username")
      .refine(
        (val) => !usernames.includes(val),
        "That username is already in use."
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const user = await addUser(values.username);

    router.push(`/${user.id}`);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-blue-400">Sign up</DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center bg-blue-50">
        <DialogHeader>
          <DialogTitle className="text-blue-400 font-bold text-2xl">
            Sign up
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
                      className="border-blue-300 bg-white"
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
            <Button className="bg-blue-400" type="submit">
              Sign up
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
