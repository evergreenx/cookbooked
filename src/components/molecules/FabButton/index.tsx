import Button from "@/components/atoms/Button";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

interface FabButtonProps {
  openBottomSheet: any;
  setOpenBottomSheet: any;
}

export const FabButton = () => {
  // const [open, setOpen] = React.useState(false);

  const fabControls = useAnimation();

  const handleFabClick = () => {
    fabControls.start("shake");
  };

  const fabVariants = {
    shake: {
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="fab__container flex justify-end p-4 right-0 bottom-0 fixed z-50 items-center  "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <motion.div
        animate={fabControls}
        variants={fabVariants}
        onClick={handleFabClick}
      >
        <Button
          size="fab"
          type="button"
          //   onClick={() => setOpenBottomSheet(true)}
        >
          <Link href={"/recipe/add"} className="create">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex items-center justify-center"
            >
              <path
                d="M10.9999 11.0001H2.15781M10.9999 2.15802V11.0001V2.15802ZM10.9999 11.0001V19.8422V11.0001ZM10.9999 11.0001H19.842H10.9999Z"
                stroke="#FAFAFA"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};
