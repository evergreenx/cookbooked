import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Document } from "@/types";
import Link from "next/link";

const HomeCard = ({
  id,
  name,
  recipe_title,
  cover__image,
  author__notes,
  serving_size,
  cooking__instruction,
  ingredients,
}: Document) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: { opacity: 1, scale: 1 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Link href={`/recipe/${id}`}>
      <motion.div
        className="rounded-2xl flex flex-col w-[150px]"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        //   whileHover={{ scale: 1.1 }}
      >
        <motion.div className="image  " variants={imageVariants}>
          <Image
            src={cover__image}
            alt="recipe image"
            priority={true}
            placeholder="blur"
            blurDataURL={cover__image}
            width={500}
            height={500}
            className="rounded-2xl h-[160px] w-[214px] object-cover"
          />
        </motion.div>
        <motion.div
          className="w-full mt-[8px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-[#2E3E5C] font-semibold text-lg tracking mb-[4px]">
            {recipe_title.length < 20
              ? recipe_title
              : recipe_title.substring(0, 20) + "..."}
          </p>
          <div className="recipe__author">
            <p className="text-[#9FA5C0] font-normal text-[10px] tracking-tighter">
              by {name}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default HomeCard;
