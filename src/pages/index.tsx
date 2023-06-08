import Button from "@/components/atoms/Button";
import { UseUser } from "@/providers/AuthProviders";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import React, { useEffect, ReactElement, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ID, Permission, Role, Query } from "appwrite";
import { client, databases, account } from "@/appwrite/config";
import Image from "next/image";
import type { NextPageWithLayout } from "./_app";
import Header from "@/components/molecules/Header";
import AppLayout from "@/components/organism/Layout/AppLayout";
import { FabButton } from "@/components/molecules/FabButton";
import RecipeCard from "@/components/atoms/RecipeCard";
import { arrowIcon } from "@/assets";
import HomeCard from "@/components/atoms/RecipeCard/HomeCard";
import { motion } from "framer-motion";
import { Document } from "../types";

const Page: NextPageWithLayout = () => {
  const { user, logout, loading } = UseUser();
  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(false);
  const [userRecipe, setUserRecipe] = useState<any>(null);
  const [recentRecipe, setRecentRecipe] = useState<any>([]); // Updated the initial state to null

  const router = useRouter();

  console.log(user);

  useEffect(() => {
    const promise = databases.listDocuments(
      "647ba64bca1fc8a8992e",
      "647ba64bca1fc8a8992e"
    );

    promise.then(
      function (response) {
        setUserRecipe(response);
        console.log(response);

        // Success
      },

      function (error) {
        console.log(error); // Failure
      }
    );

    const fetchRecentRecipes = async () => {
      setLoadingRecipe(true);
      const promise = databases.listDocuments(
        "647ba64bca1fc8a8992e",
        "647ba64bca1fc8a8992e",
        [Query.orderDesc("$createdAt"), Query.limit(9)]
      );

      promise
        .then(
          function (response) {
            setRecentRecipe(response);
            console.log(response);

            // Success
          },

          function (error) {
            console.log(error); // Failure
          }
        )
        .finally(() => {
          setLoadingRecipe(false);
        });
    };

    fetchRecentRecipes();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) {
    router.push("/auth/signin");
    return <div>redirecting...</div>;
  }
  return (
    <>
      <div className="flex flex-col justify-center p-10 ">
        <motion.h1
          className="text-[#2E3E5C]  text-[40px] lg:text-[100px] font-bold text-center tracking-tighter leading-tight"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Find best recipes <br className="hidden lg:block" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            for cooking
          </motion.span>
        </motion.h1>
        <div className="my-12">
          {loadingRecipe ? (
            "Loading..."
          ) : (
            <div className="card grid grid-cols-2 lg:grid-cols-3 gap-4">
              {userRecipe && userRecipe?.documents.map((recipe: Document) => (
                <RecipeCard
                  key={recipe.id}
         
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
        </div>

        <>
          <div className="recent__receipes flex items-center justify-between mt-10 ">
            <h1 className="text-[#2E3E5C] font-semibold text-xl text-left ">
              Recent recipes
            </h1>

            <div className="flex items-center space-x-3">
              <p className="font-semibold text-brandColor text-sm ">see all</p>
              <Image src={arrowIcon} alt="arrow" />
            </div>
          </div>

          {/* recent recipe */}
          <div className="my-[16px]">
            {loadingRecipe ? (
              "Loading..."
            ) : (
              <div className="card grid grid-cols-2 lg:grid-cols-4 gap-4">
                {recentRecipe && recentRecipe?.documents.map((recipe: Document) => (
                  <HomeCard
                    key={recipe.id}
              
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
          </div>
        </>

        <Toaster />
      </div>
    </>
  );
};

export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  console.log(page, "page");
  return <AppLayout>{page}</AppLayout>;
};
