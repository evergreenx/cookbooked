import React from "react";
import Image from "next/image";
import { searchIcon } from "@/assets";
import { motion } from "framer-motion";

const SearchInput = () => {
  return (
    <motion.div
      initial={{ y: -0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="input border-[#9FA5C0]  border-[1.3px] rounded-[10px] bg-[#FFFFFF] flex items-center h-[45px] p-2 lg:w-[50%] mx-auto">
        <Image src={searchIcon} alt="Picture of the author" />
        <input
          type="text"
          placeholder="Search recipe"
          className=" text-[#9FA5C0] rounded-lg p-2 w-full font-normal text-[11px] tracking-tighter outline-none"
        />
      </div>
    </motion.div>
  );
};

export default SearchInput;
