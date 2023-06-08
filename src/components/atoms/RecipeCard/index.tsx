import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface Document {
  collectionId?: string;
  createdAt?: string;
  databaseId?: string;
  id: string;
  permissions?: string[];
  updatedAt?: string;
  author__notes: string;
  cooking__instruction: string[];
  cover__image: string;
  ingredients: string[];
  name: string;
  recipe_title: string;
  serving_size: number;
  userId?: string;
}

const RecipeCard = ({
  name,
  recipe_title,
  cover__image,
  author__notes,
  serving_size,
  cooking__instruction,
  ingredients,
}: Document) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="relative w-80 rounded-2xl overflow-hidden shadow-lg"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ scale: 1.1 }}
    >
      <Image
        src={cover__image}
        alt="Picture of the author"
        width={400}
        height={400}
        className="rounded-2xl"
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

export default RecipeCard;
