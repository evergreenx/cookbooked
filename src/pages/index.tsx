import Button from "@/components/atoms/Button";
import { UseUser } from "@/providers/AuthProviders";
import { useRouter } from "next/router";
import React from "react";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const { user, logout, loading } = UseUser();
  const router = useRouter();

  console.log(user);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) {
    router.push("/auth/signin");
    return <div>redirecting...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-center text-xl my-5">
        {user && "logged in as " + user.name}
      </h1>
      <Button size="medium" onClick={() => logout()}>
        logout
      </Button>

      <Toaster />
    </div>
  );
};

export default Index;
