import AddRecipeForm from "@/components/organism/Layout/AddRecipeForm.tsx";
import { UseUser } from "@/providers/AuthProviders";
import { useRouter } from "next/router";
import React from "react";
import { Toaster } from "react-hot-toast";

const Add = () => {


 const { user} =  UseUser();

  const router = useRouter();


  // if (!user) {
  //   router.push("/auth/signin");
  //   return <div>redirecting...</div>;
  // }
  return (
    <div className="p-4  lg:w-[50%] w-full mx-auto ">
      <h1 className="text-2xl font-bold">Create Recipe</h1>

      <AddRecipeForm />

      <Toaster />
    </div>
  );
};

export default Add;
