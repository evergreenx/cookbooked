import { UseUser } from "@/providers/AuthProviders";
import React, { useEffect, useState } from "react";
import { databases } from "@/appwrite/config";
import { Query } from "appwrite";
import YourRecipeCard from "../RecipeCard/YourRecipeCard.tsx";
import { Document } from "@/types";
import { emptyStateIcon } from "@/assets";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link.js";
import Loader from "../Loader";

const SavedRecipe = () => {
  const { user } = UseUser();
  console;

  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(false);
  const [userRecipe, setUserRecipe] = useState<any>(null);
  useEffect(() => {
    async function asyncgetSavedRecipes() {
      setLoadingRecipe(true);
      try {

        // Perform the query
        const savedRecipes = await databases.listDocuments(
          "647ba64bca1fc8a8992e",
          "647ba64bca1fc8a8992e",
          [Query.search("favorites", "6483c248cb24e067dbc0")]
        );

        // Return the retrieved documents (saved recipes)

        setUserRecipe(savedRecipes);
        return savedRecipes;
      } catch (error) {
        console.error("Error getting saved recipes:", error);
        return []; // Return an empty array or handle the error as per your application's logic
      } finally {
        setLoadingRecipe(false);
      }
    }

    asyncgetSavedRecipes();
  }, []);

  if (loadingRecipe) {
    return <Loader />;
  }

  return (
    <div>
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

        {userRecipe?.total === 0 && (
          <div className="flex flex-col items-center justify-center my-10">
            <Image src={emptyStateIcon} alt="empty state " className="my-5" />
            <h2 className="text-[#c9c8c8] font-semibold text-[20px]  mb-5">
            your saved recipes will appear here
            </h2>

            
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipe;
