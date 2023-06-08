import AddRecipeForm from "@/components/organism/Layout/AddRecipeForm.tsx";
import React from "react";
import { Toaster } from "react-hot-toast";

const add = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create Recipe</h1>

      <AddRecipeForm />

      <Toaster />
    </div>
  );
};

export default add;
