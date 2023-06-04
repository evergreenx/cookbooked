import { UseUser } from "@/providers/AuthProviders";
import Header from "../../molecules/Header/index";

export default function AppLayout({ children }: any) {
  const { user } = UseUser();

  return (
    <>
      <Header user={user} />
      <main>{children}</main>
    </>
  );
}
