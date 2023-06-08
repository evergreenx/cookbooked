import React, { ChangeEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@/components/atoms/Button";
import { cameraIcon } from "@/assets";
import Image from "next/image";
import FileUpload from "@/components/molecules/FileUpload";
import SelectServing from "@/components/atoms/SelectServing";
import CustomInput from "@/components/atoms/CookingInstruction/CustomInput";
import { ID, Permission, Role } from "appwrite";
import { databases } from "@/appwrite/config";
import { UseUser } from "@/providers/AuthProviders";
import CustomIngredientsInput from "@/components/atoms/IngredientsInput";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const AddRecipeForm = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const router = useRouter();

  const [getCookingSteps, setGetCookingSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getIngredient, setGetIngredients] = useState([]);
  const [ServingSize, setServingSize] = useState(1);

  const { user } = UseUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Formik
        initialValues={{
          title: "",
          // coverImage: "",
          servicingSize: "",
          authorNote: "",
          cookIngSteps: getCookingSteps,
          ingredients: getIngredient,
        }}
        onSubmit={(values, { setSubmitting }) => {
          // save to to an array

          setIsLoading(true);
          const data = {
            recipe_title: values.title,
            // cover__image: values.coverImage,
            userId: user?.$id,
            name: user?.name,
            cover__image:
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
            serving_size: ServingSize,
            author__notes: values.authorNote,
            cooking__instruction: getCookingSteps,
            ingredients: getIngredient,
          };

          const promise = databases.createDocument(
            "647ba64bca1fc8a8992e",
            "647ba64bca1fc8a8992e",

            ID.unique(),
            data,
            [
              // Permission.read(Role.user(user["$id"])),
              Permission.write(Role.user(user["$id"])),

              Permission.read(Role.any()), // Anyone can view this document
              Permission.update(Role.user(user["$id"])),
              Permission.delete(Role.user(user["$id"])), // Writers can update this document     // Admins can update this document
            ]
          );

          promise
            .then(
              function (response) {
                toast.success("recipe created 🔥⛄");

                // Success

                router.push("/");
              },
              function (error) {
                console.log(error);

                toast.error(error.message);

                // Failure
              }
            )
            .finally(() => setIsLoading(false));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();

              handleSubmit();
            }}
          >
            <motion.div
              variants={itemVariants}
              className="title flex flex-col my-[20px]"
            >
              <motion.label className="text-sm font-semibold mb-[10px]">
                Recipe Title
              </motion.label>
              <motion.input
                type="text"
                name="title"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded-3xl text-[#7c7c7c] text-sm p-4 bg-gray-50 outline-none w-full lg:w-[30%] "
                value={values.title}
                placeholder="Type your recipe name here"
              />
              {errors.title && touched.title && errors.title}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="cover__image flex flex-col my-[20px]"
            >
              {/* <motion.label className="text-sm font-semibold mb-[10px]">
                Add cover image
              </motion.label> */}
              {/* TODO : add image feature to use appwrite storage */}

              {/* <FileUpload
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}

              /> */}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="serving__sizes my-[20px] flex flex-col "
            >
              <motion.label className="text-sm  font-semibold mb-[10px]">
                Serving Size
              </motion.label>

              <SelectServing setServingSize={setServingSize} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="cooking__intstructions my-[20px]"
            >
              <label className="text-sm font-semibold mb-[10px] ">
                Cooking Instruction
              </label>

              <CustomInput setGetSteps={setGetCookingSteps} />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="cooking__intstructions my-[20px]"
            >
              <label className="text-sm font-semibold mb-[10px] ">
                Ingredients
              </label>

              <CustomIngredientsInput setGetIngredients={setGetIngredients} />
            </motion.div>
            <motion.div variants={itemVariants} className="author__notes">
              <label className="text-sm font-semibold mb-[10px] ">
                Author notes
              </label>
              <textarea
                className="rounded-3xl text-[#7c7c7c] text-sm px-4 py-5 flex items-center bg-gray-50 outline-none w-full lg:w-[30%] overflow-hidden resize-none "
                placeholder="Add tips and tricks 🤗"
                name="authorNote"
                value={values.authorNote}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="button my-[20px]">
              <Button size="large" type="submit" disable={isLoading}>
                {isLoading ? "lOADING" : "Done"}
              </Button>
            </motion.div>
          </motion.form>
        )}
      </Formik>
    </motion.div>
  );
};

export default AddRecipeForm;
