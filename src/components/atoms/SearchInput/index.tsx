import React from "react";
import Image from "next/image";
import { searchIcon } from "@/assets";
import { motion } from "framer-motion";

interface Props {
  search?: string;
  setSearch?: any;
}

const SearchInput = ({ search, setSearch }: Props) => {
  return (
    <motion.div
      className="input border-[#9FA5C0]  border-[1.3px] rounded-[10px] bg-[#FFFFFF] flex items-center h-[40px] p-2 w-full mx-auto"
      initial={{ y: -0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Image src={searchIcon} alt="Picture of the author" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search recipe"
        className=" text-[#9FA5C0] rounded-lg p-2 w-full font-normal text-[11px] tracking-tighter outline-none"
      />
    </motion.div>
  );
};

export default SearchInput;
