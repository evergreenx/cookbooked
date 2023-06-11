import RecipeSuccess from "@/components/atoms/Dialog/recipeSuccess";
import Loader from "@/components/atoms/Loader";
import AddRecipeForm from "@/components/organism/Layout/AddRecipeForm.tsx";
import { UseUser } from "@/providers/AuthProviders";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

const Add = () => {
  const { user, loading } = UseUser();

  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

  const router = useRouter();

 
  if (loading) {
    return <Loader />;
  }


  if (!user) {
    router.push("/auth/signin");
    return <div>redirecting...</div>;
  }


  return (
    <div className="p-4  lg:w-[50%] w-full mx-auto ">
      <h1 className="text-2xl font-bold">Create Recipe</h1>

      <AddRecipeForm setShowSuccessDialog={setShowSuccessDialog} />

      <Toaster />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="

"
      ></motion.div>
      <RecipeSuccess
        setShowSuccessDialog={setShowSuccessDialog}
        showSuccessDialog={showSuccessDialog}
      />
    </div>
  );
};

export default Add;
