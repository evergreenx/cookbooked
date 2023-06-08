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

interface Document {
  collectionId?: string;
  createdAt?: string;
  databaseId: string;
  id: string;
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
          console.log(response.documents);

          const documents = response;
          setUserRecipe(documents);

          // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      )
      .finally(() => {
        setLoadingRecipe(false);
      });
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) {
    router.push("/auth/signin");
  }

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
        <h2 className="text-[#2E3E5C] font-semibold text-[20px] capitalize">
          {user?.name}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="userbio px-8"
      >
        <h2 className="text-[#A9A9A9] font-normal text-sm capitalize">
          {user?.prefs.bio}
        </h2>
      </motion.div>

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
            {userRecipe && userRecipe?.total}
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
            3
          </h2>
        </motion.div>
      </motion.div>

      {/* empty state for personal recipe */}

      {userRecipe?.total === 0 && (
        <div className="flex flex-col items-center justify-center my-10">
          <Image src={emptyStateIcon} alt="empty state " className="my-5" />
          <h2 className="text-[#c9c8c8] font-semibold text-[20px]  mb-5">
         No Recipe yet 
          </h2>

          <Button size="small">
            <Link href="/recipe/add">Create a Recipe</Link>
          </Button>
        </div>
      )}

      {loadingRecipe ? (
        "Loading..."
      ) : (
        <div className="card grid grid-cols-2 lg:grid-cols-3 gap-4">
          {userRecipe?.documents.map((recipe: Document) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              author__notes={recipe.author__notes}
              cooking__instruction={recipe.cooking__instruction}
              cover__image={recipe.cover__image}
              ingredients={recipe.ingredients}
              name={recipe.name}
              recipe_title={recipe.recipe_title}
              serving_size={recipe.serving_size}
            />
          ))}
        </div>
      )}

      <Toaster />
    </motion.div>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
  console.log(page, "page");
  return <AppLayout>{page}</AppLayout>;
};
