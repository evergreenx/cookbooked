import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Document } from "@/types";
import { unionIcon } from "@/assets";
import { UserCardOptions } from "../../DropMenu";
import { databases } from "@/appwrite/config";
import { toast } from "react-hot-toast";
import router from "next/router";

const YourRecipeCard = ({
  name,
  id,
  recipe_title,
  cover__image,
  author__notes,
  serving_size,
  cooking__instruction,
  ingredients,
}: Document) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, duration: 0.8, delay: 0.5 },
  };

  const handleDeleteRecipe = () => {
    const promise = databases.deleteDocument(
      "647ba64bca1fc8a8992e",
      "647ba64bca1fc8a8992e",
      `${id}`
    );

    promise.then(
      function (response) {
        response;
        toast.success("Recipe deleted successfully");

        router.reload();
        // Success
      },
      function (error) {
        error;
        toast.error(error.message);
        // Failure
      }
    );
  };

  return (
    <motion.div
      className="relative   lg:w-[250px] lg:h-[250px] h-[200px]  w-full rounded-2xl overflow-hidden shadow-lg"
      initial="hidden"
      animate="visible"

    >
      <UserCardOptions handleDeleteRecipe={handleDeleteRecipe} />
      <Image
        src={cover__image}
        alt="recipe  image"
        width={400}
        height={400}
        className="rounded-2xl h-full w-full object-cover"
      />

      <div className="absolute  left-0 bottom-0 w-full h-full flex items-center justify-center">
        <motion.div
          className="bg-[#30303067] flex justify-end flex-col h-full w-full rounded-2xl bg-opacity-50 p-4"
          //   whileHover={{ scale: 1.1 }}
        >
          <p className="text-white font-bold text-lg tracking-tighter">
            {recipe_title}
          </p>

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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default YourRecipeCard;
