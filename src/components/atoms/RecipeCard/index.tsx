import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Document } from "@/types";
import { timeIcon, unionIcon } from "@/assets";
import { FavCardOptions, UserCardOptions } from "../DropMenu";
import { databases } from "@/appwrite/config";
import { toast } from "react-hot-toast";
import router from "next/router";
import { UseUser } from "@/providers/AuthProviders";
import Link from "next/link";

const RecipeCard = ({
  name,
  id,
  recipe_title,
  cover__image,
  author__notes,
  serving_size,
  cooking__instruction,
  ingredients,
  cooking__duration,
}: Document) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, duration: 0.8, delay: 0.5 },
  };

  const { user } = UseUser();
  const handleAddToFav = async () => {
    try {
      const recipe = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DOC_ID || "",
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",

        `${id}`
      );

      const favorites = recipe.favorites || [];
      const isFavorite = favorites.includes(user.$id);

      if (isFavorite) {
        const updatedFavorites = favorites.filter(
          (id: string) => id !== user.$id
        );
        recipe.favorites = updatedFavorites;
        toast("Recipe removed from favorites");
      } else {
        // Append the user's ID to the favorites array
        recipe.favorites = [...favorites, user.$id];
        toast.success("Recipe added to favorites 😋");
      }

      const updateData = {
        favorites: recipe.favorites,
      };

      const response = await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DOC_ID || "",
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",

        `${id}`,
        updateData
      );

      console.log("Recipe document updated successfully:", response);
    } catch (error) {
      console.error("Error updating recipe document:", error);
    }
  };

  return (
    <Link href={`/recipe/${id}`} className="lg:w-[250px] lg:h-[250px] h-[200px]">
      <motion.div
        className="relative    lg:w-[250px] lg:h-[250px] h-[200px]  w-full rounded-2xl overflow-hidden shadow-lg"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <FavCardOptions handleAddToFav={handleAddToFav} />
        <Image
          src={cover__image}
          alt="Picture of the author"
          width={400}
          height={400}
          className="rounded-2xl h-full w-full object-cover"
        />

        <div className="absolute details left-0 bottom-0 w-full h-full flex items-center justify-center">
          <motion.div
            className="bg-[#30303067] flex justify-end flex-col h-full w-full rounded-2xl bg-opacity-50 p-4"
            //   whileHover={{ scale: 1.1 }}
          >
            <p className="text-white font-bold text-lg tracking-tighter">
              {recipe_title.length < 20
                ? recipe_title
                : recipe_title.substring(0, 20) + "..."}
            </p>

            <div className="duration flex items-center justify-between">
              <span>
                <p className="text-white font-normal text-sm">
                  {ingredients.length + " "}
                  Ingredient
                  {
                    // if ingredients.length > 1, add "s" to the word "Ingredients"
                    ingredients.length > 1 ? "s" : ""
                  }
                </p>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default RecipeCard;
