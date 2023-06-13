import React from "react";
import { useEffect, useState } from "react";
import { Document } from "@/types";
import { useRouter } from "next/router";
import { databases } from "@/appwrite/config";
import { Query } from "appwrite";
import { UseUser } from "@/providers/AuthProviders";
import Loader from "@/components/atoms/Loader";

import { emptyStateIcon } from "@/assets";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import YourRecipeCard from "../RecipeCard/YourRecipeCard.tsx";

const YourRecipe = ({}) => {
  const { user } = UseUser();
  const [userRecipe, setUserRecipe] = useState<any>(null); // Updated the initial state to null
  const router = useRouter();
  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(false);

  useEffect(() => {
    setLoadingRecipe(true);
    const promise = databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DOC_ID || "",
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",

      [Query.equal("userId", [user?.$id])]
      // [Query.limit(1)
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

  if (loadingRecipe) {
    return <Loader />;
  }

  if (!user) {
    router.push("/auth/signin");
  }

  return (
    <div>
      {loadingRecipe ? (
        "Loading..."
      ) : (
        <div className="card grid grid-cols-2 lg:grid-cols-3 gap-4">
          {userRecipe?.documents.map((recipe: Document) => (
            <YourRecipeCard
              key={recipe.$id}
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
      )}











{userRecipe?.total === 0 &&  (
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

    </div>
  );
};

export default YourRecipe;
