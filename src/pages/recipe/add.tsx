import AddRecipeForm from "@/components/organism/Layout/AddRecipeForm.tsx";
import React from "react";

const add = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create Recipe</h1>

      <AddRecipeForm />
    </div>
  );
};

export default add;
