import SearchCard from "@/components/atoms/RecipeCard/SearchCard";
import SearchInput from "@/components/atoms/SearchInput";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { databases } from "@/appwrite/config";
import { UseUser } from "@/providers/AuthProviders";
import { Document } from "@/types";
import Button from "@/components/atoms/Button";
import { emptySearch, filterIcon } from "@/assets";
import Image from "next/image";
import Loader from "@/components/atoms/Loader";

const Search = () => {
  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(false);

  const { user, loading, loadingFeedback } = UseUser();

  const [search, setSearch] = useState<string>("");
  const [seachResults, setSearchResult] = useState<any>(null); // Updated the initial state to null

  const handleSearch = () => {
    setLoadingRecipe(true);

    setLoadingRecipe(true);
    const promise = databases.listDocuments(
      "647ba64bca1fc8a8992e",
      "647ba64bca1fc8a8992e",
      // [Query.equal("userId", [user?.$id])]
      // [Query.limit(1)]
      // [Query.select(["createdAt", "DESC"])]
      [Query.search("recipe_title", search)]
    );

    promise
      .then(
        function (response) {
          console.log(response.documents);

          const documents = response;
          setSearchResult(documents);
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
  };

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

      <form
        className="filter__container w-full lg:w-[50%] flex mx-auto space-x-7 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <SearchInput setSearch={setSearch} search={search} />

        <Button size="filter" type="submit">
          <Image src={filterIcon} alt="search icon" width={20} height={20} />
        </Button>
      </form>

      {
        // show only there is result
        seachResults?.documents.length > 0 && (
          <div className="search__result flex items-center justify-between w-full lg:w-[50%] mx-auto my-[20px]">
            <h1 className="text-[#2E3E5C] text-base font-semibold">
              Search result
            </h1>

            {/* show only there is result */}
            {
              <p className="text-[#A9A9A9] text-[11px] font-normal">
                {seachResults?.documents.length} recipes found
              </p>
            }
          </div>
        )
      }

      {loadingRecipe && <Loader />}

      {seachResults?.documents.length === 0 && (
        <div className="search__result flex items-center justify-center w-full  mx-auto my-[20px] flex-col space-y-6">
          <Image src={emptySearch} alt="search icon" width={200} height={200} />

          <p className="text-[#2E3E5C] text-base font-semibold text-center">
            No recipe found for <span className="text-[#A9A9A9]">{search}</span>
          </p>
        </div>
      )}

      <div className="results  grid grid-cols-1 lg:grid-cols-4 gap-4 items-center justify-center mx-auto my-[70px]">
        {seachResults?.documents.map((recipe: Document) => (
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
