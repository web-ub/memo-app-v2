"use client";

import { LogInForm } from "@/components/LogInForm";
import { SignUpForm } from "@/components/SignUpForm";
import { UserType } from "@/types/type";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchAllUsers = async () => {
    const res = await fetch(`/api/users`, { cache: "no-store" });

    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center bg-gray-200 h-screen space-y-3">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-center font-bold text-4xl">Welcome to Memo App!</h1>
        <p className="text-center text-2xl">You can make memos here</p>
      </div>
      <div className="flex justify-between w-40">
        <LogInForm users={users} />
        <SignUpForm users={users} />
      </div>
    </main>
  );
}
