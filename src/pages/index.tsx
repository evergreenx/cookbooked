import Button from "@/components/atoms/Button";
import { UseUser } from "@/providers/AuthProviders";
import { useRouter } from "next/router";
import React from "react";

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
    <div>
      index
      {user && "logged in as " + user.name}
      <Button size="small" onClick={() => logout()}>
        logout
      </Button>
    </div>
  );
};

export default Index;
