import Button from "@/components/atoms/Button";
import { UseUser } from "@/providers/AuthProviders";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import React, { useEffect, ReactElement, useState, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Query } from "appwrite";
import { databases } from "@/appwrite/config";
import Image from "next/image";
import type { NextPageWithLayout } from "./_app";
import AppLayout from "@/components/organism/Layout/AppLayout";
import { FabButton } from "@/components/molecules/FabButton";
import RecipeCard from "@/components/atoms/RecipeCard";
import { arrowIcon } from "@/assets";
import HomeCard from "@/components/atoms/RecipeCard/HomeCard";
import { AnimatePresence, motion } from "framer-motion";
import { Document } from "../types";
import Loader from "@/components/atoms/Loader";
import SearchInput from "@/components/atoms/SearchInput";
import Link from "next/link";
import { foodFacts } from "@/data/foodfacts";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

const Page: NextPageWithLayout = () => {
  const { user, logout, loading } = UseUser();
  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(false);
  const [userRecipe, setUserRecipe] = useState<any>(null);
  const [recentRecipe, setRecentRecipe] = useState<any>([]); // Updated the initial state to null

  const router = useRouter();

  useEffect(() => {
    const promise = databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DOC_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || ""
    );

    promise.then(
      function (response) {
        setUserRecipe(response);
        response;

        // Success
      },

      function (error) {
        error; // Failure
      }
    );

    const fetchRecentRecipes = async () => {
      setLoadingRecipe(true);
      const promise = databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DOC_ID || "",
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",

        [Query.orderDesc("$createdAt"), Query.limit(9)]
      );

      promise
        .then(
          function (response) {
            setRecentRecipe(response);
            response;

            // Success
          },

          function (error) {
            error; // Failure
          }
        )
        .finally(() => {
          setLoadingRecipe(false);
        });
    };

    fetchRecentRecipes();
  }, []);

  const [fact, setFact] = useState("");
  const [run, setRun] = useState(false);

  useEffect(() => {
    getRandomFact();
    const timer = setInterval(getRandomFact, 10000); // 60000 milliseconds = 1 minute
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hasSeenJoyride = localStorage.getItem("hasSeenJoyride");

    if (!hasSeenJoyride) {
      // Show joyride for the first time
      setRun(true);
      localStorage.setItem("hasSeenJoyride", "true");
    }
  }, []);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * foodFacts.length);
    const randomFact = foodFacts[randomIndex].fact;
    setFact(randomFact);
  };

  const steps = [
    {
      target: ".home",
      disableBeacon: true,
      content: (
        <>
          <h1 className="text-xl font-bold text-brandColor">
            Welcome to Cookbooked
          </h1>
          <p className="text-sm font-medium">
            Discover the best recipes for cooking
          </p>
        </>
      ),
    },
    {
      target: ".search",
      content: (
        <>
          <h1 className="text-xl font-bold text-brandColor">
            Search for Recipes
          </h1>
          <p className="text-sm font-medium">
            Find recipes by name, ingredients, or tags to suit your taste
          </p>
        </>
      ),
    },
    {
      target: ".second",
      content: (
        <>
          <h1 className="text-xl font-bold text-brandColor">
            Find Your Perfect Recipe
          </h1>
          <p className="text-sm font-medium">
            Browse thousands of recipes from around the world. From quick and
            easy meals to gourmet delights, we ve got you covered.
          </p>
        </>
      ),
    },
    {
      target: ".save",
      content: (
        <>
          <h1 className="text-xl font-bold text-brandColor">
            Save Your Recipes
          </h1>
          <p className="text-sm font-medium">
            Never lose a recipe again! Save your favorite recipes to access them
            anytime, anywhere.
          </p>
        </>
      ),
    },
    {
      target: ".create",
      content: (
        <>
          <h1 className="text-xl font-bold text-brandColor">
            Create Your Own Recipe
          </h1>
          <p className="text-sm font-medium">
            Unleash your creativity and share your own unique recipes with the
            world.
          </p>
        </>
      ),
    },
    {
      target: ".profile",
      content: (
        <>
          <h1 className="text-xl font-bold text-brandColor">
            Manage Your Profile
          </h1>
          <p className="text-sm font-medium">
            All your created recipes and saved recipes are here. Customize your
            profile to make it truly yours.
          </p>
        </>
      ),
    },
    {
      target: ".details",
      content: (
        <>
          <h1 className="text-xl font-bold text-brandColor">
            Explore Recipe Details
          </h1>
          <p className="text-sm font-medium">
            Dive into the details of each recipe and discover cooking
            instructions, ingredients, and more.
          </p>
        </>
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  if (loadingRecipe || !userRecipe) {
    return <Loader />;
  }

  if (!user) {
    router.push("/auth/signin");
    return <Loader />;
  }

  function logGroup(type: string, data: any) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }

    logGroup(type, data);
  };
  return (
    <div className="">
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        disableScrolling
        showSkipButton={false}
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />

      <FabButton />

      <div className="flex flex-col justify-center p-10 ">
        <AnimatePresence mode="wait">
          <motion.p
            className="text-[#2E3E5C]  text-[30px] lg:text-[50px] font-bold text-left tracking-tighter leading-tight"
            key={fact}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ cursor: "pointer" }}
            whileTap={{ scale: 0.9 }}
          >
            {fact}
          </motion.p>
        </AnimatePresence>

        <Link
          className=" my-8 w-full lg:w-[50%] mx-auto first"
          href="/recipe/search"
        >
          <SearchInput />
        </Link>
        <div className="my-12">
          {loadingRecipe ? (
            "Loading..."
          ) : (
            <div
              className="card
            second
            grid grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center mx-auto content-center"
            >
              {userRecipe &&
                userRecipe?.documents.map((recipe: Document) => (
                  <RecipeCard
                    key={recipe.$id}
                    id={recipe.$id}
                    author__notes={recipe.author__notes}
                    cooking__instruction={recipe.cooking__instruction}
                    cover__image={recipe.cover__image}
                    ingredients={recipe.ingredients}
                    name={recipe.name}
                    recipe_title={recipe.recipe_title}
                    serving_size={recipe.serving_size}
                    cooking__duration={recipe.cooking__duration}
                  />
                ))}
            </div>
          )}
        </div>

        <>
          {/* recent recipe */}
          <div className="my-[16px]">
            {loadingRecipe ? (
              "Loading..."
            ) : (
              <>
                <div className="recent__receipes flex items-center justify-between my-10 ">
                  <h1 className="text-[#2E3E5C] font-semibold text-xl text-left ">
                    Recent recipes
                  </h1>

                  <div className="flex items-center space-x-3">
                    <p className="font-semibold text-brandColor text-sm ">
                      see all
                    </p>
                    <Image src={arrowIcon} alt="arrow" />
                  </div>
                </div>

                <div className="card grid grid-cols-2  lg:grid-cols-4 gap-4 content-center">
                  {recentRecipe &&
                    recentRecipe?.documents?.map((recipe: Document) => (
                      <HomeCard
                        key={recipe.id}
                        id={recipe.$id}
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
              </>
            )}
          </div>
        </>

        <Toaster />
      </div>
    </div>
  );
};

export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
