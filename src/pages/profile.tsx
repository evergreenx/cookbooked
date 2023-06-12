import { UseUser } from "@/providers/AuthProviders";
import React, { ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import UserAvatar from "@/components/atoms/Avatar";
import AppLayout from "@/components/organism/Layout/AppLayout";
import EditProfileDialog from "@/components/atoms/Dialog";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { Query } from "appwrite";
import { databases } from "@/appwrite/config";
import RecipeCard from "@/components/atoms/RecipeCard";
import { emptyStateIcon } from "@/assets";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import Loader from "@/components/atoms/Loader";
import UserTabs from "@/components/atoms/Tab";

interface Document {
  collectionId?: string;
  createdAt?: string;
  databaseId: string;
  $id: string;
  permissions: string[];
  updatedAt: string;
  author__notes: string;
  cooking__instruction: string[];
  cover__image: string;
  ingredients: string[];
  name: string;
  recipe_title: string;
  serving_size: number;
  userId: string;
}

const Profile = () => {
  const { user, loading, loadingFeedback } = UseUser();
  const [userRecipe, setUserRecipe] = useState<any>(null); // Updated the initial state to null
  const [savedRecipe , setSavedRecipe] = useState<any>(0);
  const router = useRouter();
  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(false);

  useEffect(() => {
    setLoadingRecipe(true);
    const promise = databases.listDocuments(
      "647ba64bca1fc8a8992e",
      "647ba64bca1fc8a8992e",
      [Query.equal("userId", [user?.$id])]
      // [Query.limit(1)]
      // [Query.select(["createdAt", "DESC"])]
      // [Query.equal("title", ["Iron Man"])]
    );

    promise
      .then(
        function (response) {
          (response.documents);

          const documents = response;
          setUserRecipe(documents);
          // reload the page

          // Success
        },
        function (error) {
          (error); // Failure
        }
      )
      .finally(() => {
        setLoadingRecipe(false);
      });
  }, [user]);








  useEffect(() => {
    async function asyncgetSavedRecipes() {
      setLoadingRecipe(true);
      try {

        // Perform the query
        const savedRecipes = await databases.listDocuments(
          "647ba64bca1fc8a8992e",
          "647ba64bca1fc8a8992e",
          [Query.search("favorites", user.$id)]
        );

        // Return the retrieved documents (saved recipes)

        setSavedRecipe(savedRecipes);
        return savedRecipes;
      } catch (error) {
        console.error("Error getting saved recipes:", error);
        return []; // Return an empty array or handle the error as per your application's logic
      } finally {
        setLoadingRecipe(false);
      }
    }

    asyncgetSavedRecipes();
  }, );
















  if (loading) {
    return <Loader />;
  }


  if (!user) {
    router.push("/auth/signin");
  }

  console.log(userRecipe?.total  , 'userRecipe.total');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full py-3 px-5"
    >
      <div className="wallpaper userBg h-52 w-full rounded-t-2xl"></div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="useravatar flex justify-between items-center -mt-20 p-8"
      >
        <UserAvatar sizes="large" />

        <EditProfileDialog />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="userdetails px-8"
      >
        <h2 className="text-[#2E3E5C] font-semibold text-[20px] ">
          {user?.name}
        </h2>

        <p className="text-sm text-[#9FA5C0]">@{user?.email}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="userbio px-8"
      >
        <h2 className="text-[#A9A9A9] font-normal text-sm capitalize">
          {user?.prefs.bio}
        </h2>

        <p className="text-sm text-[#9FA5C0]">
          joined since:{" "}
          {new Date(user?.registration).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </motion.div>


{
  userRecipe  &&
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="userreceipeinfo px-8 my-6 flex space-x-[47px]"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="info"
    >
      <h3 className="text-[#9FA5C0] font-normal text-xs capitalize">
        Recipe
      </h3>
      <h2 className="text-xl text-[#2E3E5C] font-semibold text-center">
        { userRecipe?.total}
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="info"
    >
      <h3 className="text-[#9FA5C0] font-normal text-xs capitalize">
        Saved Recipe
      </h3>
      <h2 className="text-xl text-[#2E3E5C] font-semibold text-center">
        {
        savedRecipe &&   savedRecipe?.total
        }
      
      </h2>
    </motion.div>
  </motion.div>

}
      {/* empty state for personal recipe */}

 

      <UserTabs userRecipe={userRecipe}

loadingRecipe={loadingRecipe}
      
      />

      <Toaster />
    </motion.div>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {

  return <AppLayout>{page}</AppLayout>;
};
