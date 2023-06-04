import { UseUser } from "@/providers/AuthProviders";
import Header from "../../molecules/Header/index";
import { useEffect } from "react";

export default function AppLayout({ children }: any) {
  const { user, loading } = UseUser();

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
