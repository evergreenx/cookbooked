import { databases } from "@/appwrite/config";
import { servesIcon, timeIcon } from "@/assets";
import Loader from "@/components/atoms/Loader";
import { UseUser } from "@/providers/AuthProviders";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [singleRecipe, setSingleRecipe] = useState<any>(null);

 const {user}  = UseUser();
  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const handleGetSingleRecipe = async () => {
      setLoadingRecipe(true);
      const promise = databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DOC_ID || "",
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",
        `${id}`
      );

      promise
        .then(
          function (response) {
            setSingleRecipe(response);
            response;
            // Success
          },

          function (error) {
            error; // Failure
          }
        )
        .finally(() => {
          setLoadingRecipe(false);
        });
    };

    handleGetSingleRecipe();
  }, []);


  if (!user) {
    router.push("/auth/signin");
    return <Loader />;
  }
  if (loadingRecipe) {
    return <Loader />;
  }


  return (
    <div className="p-4">
      <div className="recipe__image flex justify-center py-8">
        <motion.div
          className="relative w-full h-[450px] rounded-[10px] overflow-hidden shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Image
            src={singleRecipe?.cover__image}
            alt="recipe image"
            width={600}
            height={600}
            className="h-full w-[100%] object-cover rounded-[10px]"
          />

          <div className="absolute left-0 bottom-0 w-full h-full flex items-center justify-center">
            <motion.div
              className="text flex justify-end flex-col h-full w-full bg-opacity-50 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-white flex justify-between font-bold text-2xl tracking">
                {singleRecipe?.recipe_title}
                <div className="duration flex items-center justify-between"></div>
              </div>
              <span className="mt-[3px]">
                <p className="text-[#A9A9A9] font-normal text-base">
                  by {singleRecipe?.name}
                </p>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="updatedAt"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[#A9A9A9] text-sm text-center">
          <span className="text-brandColor font-bold"> Updated on: </span>
          {" " +
            new Date(singleRecipe?.$updatedAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
      </motion.div>

      <motion.div
        className="recipe__details flex items-center justify-center my-10 space-x-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="duration shadow-lg rounded-xl p-3 text-center flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="duration__icon flex space-x-4">
            <Image src={timeIcon} alt="time" />
            <p className="text-brandColor font-bold ">
              {singleRecipe?.cooking__duration} mins{" "}
            </p>
          </div>
          <p className="text-[#A9A9A9] text-sm">cook time</p>
        </motion.div>

        <motion.div
          className="serves shadow-lg rounded-xl p-3 text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="duration__icon flex space-x-4 ">
            <Image src={servesIcon} width={20} height={20} alt="serving" />

            <p className="text-brandColor font-bold text-sm">
              {singleRecipe?.serving_size}
              {singleRecipe?.serving_size === 1 ? " serving" : " servings"}
            </p>
          </div>
          <p className="text-[#A9A9A9] text-sm">serves</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="author__notes text-base font-medium text-left my-6  text-[#2E3E5C] "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p>{singleRecipe?.author__notes}</p>
      </motion.div>

      <motion.div
        className="ingredients"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-left my-2  text-[#2E3E5C] ">
          Ingredients:
        </h1>
        {/* ingredients list */}
        <AnimatePresence>
          <ol className="list-decimal text-[#2E3E5C]  marker:text-brandColor text-sm marker:font-semibold p-4 ">
            {singleRecipe?.ingredients.map((ingredient: any, index: number) => (
              <motion.li
                className="ingredient__item p-3"
                key={ingredient}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {ingredient}
              </motion.li>
            ))}
          </ol>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="instruction"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-left my-2  text-[#2E3E5C] ">
          Instructions:
        </h1>
        {/* Instructions list */}
        <AnimatePresence>
          <div className="text-[#2E3E5C]  ">
            {singleRecipe?.cooking__instruction.map(
              (ingredient: any, index: number) => (
                <motion.div
                  className="py-[10px]"
                  key={ingredient}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="text-[#2E3E5C] font-semibold text-sm">
                    Step{" "}
                    {singleRecipe?.cooking__instruction.indexOf(ingredient) + 1}
                  </p>
                  <p className="ingredient__item p-3" key={ingredient}>
                    {ingredient}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;


export async function getServerSideProps(context: any) {
    return {
      props: {}, // will be passed to the page component as props
    };
  }