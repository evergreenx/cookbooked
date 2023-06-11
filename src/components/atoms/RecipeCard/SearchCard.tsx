import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Document } from "@/types";
import { unionIcon } from "@/assets";
import { UserCardOptions } from "../DropMenu";
import { databases } from "@/appwrite/config";
import { toast } from "react-hot-toast";
import router from "next/router";

const SearchCard = ({
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

  return (
    <motion.div
      className="relative  w-[190px] h-[190px] rounded-2xl overflow-hidden shadow-lg"
      initial="hidden"
      animate="visible"
      variants={cardVariants}

    >

      <Image
        src={cover__image}
        alt="recipe image"
        width={400}
        height={400}
        className="rounded-2xl h-full w-full object-cover"
      />

      <div className="absolute  left-0 bottom-0 w-full h-full flex items-center justify-center">
        <motion.div
          className="text flex justify-end flex-col h-full w-full bg-opacity-50 p-4"
 
        >
          <p className="text-white font-bold text-sm tracking-tighter">
            {recipe_title}
          </p>

          <span className="mt-[3px]">
            <p className="text-[#A9A9A9] font-normal text-xs">
              by {name}
            </p>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SearchCard;
