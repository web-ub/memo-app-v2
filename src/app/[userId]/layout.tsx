import { ReactNode } from "react";
import { AppWrapper } from "./components/AppWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AppWrapper>{children}</AppWrapper>;
}
