import SearchInput from "@/components/atoms/SearchInput";
import { motion } from "framer-motion";
import React from "react";

const search = () => {
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

      <SearchInput />

      <div className="search__result flex items-center justify-between w-full lg:w-[50%] mx-auto my-[20px]">
        <h1 className="text-[#2E3E5C] text-base font-semibold">
          Search result
        </h1>

        <p className="text-[#A9A9A9] text-[11px] font-normal">
          200 recipes found
        </p>
      </div>
    </motion.div>
  );
};

export default search;
