import SearchCard from "@/components/atoms/RecipeCard/SearchCard";
import SearchInput from "@/components/atoms/SearchInput";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { databases } from "@/appwrite/config";
import { UseUser } from "@/providers/AuthProviders";
import { Document } from "@/types";
import Button from "@/components/atoms/Button";
import { searchIcon } from "@/assets";
import Image from "next/image";

const Search = () => {
  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(false);

  const { user, loading, loadingFeedback } = UseUser();

  const [search, setSearch] = useState<string>("");
  const [userRecipe, setUserRecipe] = useState<any>(null); // Updated the initial state to null

  useEffect(() => {
    setLoadingRecipe(true);
    const promise = databases.listDocuments(
      "647ba64bca1fc8a8992e",
      "647ba64bca1fc8a8992e"
      // [Query.equal("userId", [user?.$id])]
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
          // reload the page

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

  return (
    <motion.div
      className="p-10"
      initial={{ y: -0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <h1 className="text-[#2E3E5C] font-semibold text-lg text-center mb-[17px]">
        Search recipes
      </h1>

      <SearchInput setSearch={setSearch} search={search} />

      <div className="search__result flex items-center justify-between w-full lg:w-[50%] mx-auto my-[20px]">
        <h1 className="text-[#2E3E5C] text-base font-semibold">
          Search result
        </h1>

        <p className="text-[#A9A9A9] text-[11px] font-normal">
          200 recipes found
        </p>
      </div>

      <div className="results  grid grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center mx-auto">
        {userRecipe?.documents.map((recipe: Document) => (
          <SearchCard
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
    </motion.div>
  );
};

export default Search;
