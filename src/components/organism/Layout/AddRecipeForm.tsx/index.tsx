import React, { ChangeEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@/components/atoms/Button";
import { cameraIcon } from "@/assets";
import Image from "next/image";
import FileUpload from "@/components/molecules/FileUpload";
import SelectServing from "@/components/atoms/SelectServing";
import CustomInput from "@/components/atoms/CookingInstruction/CustomInput";

const AddRecipeForm = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          coverImage: "",
          servicingSize: "",
          authorNote: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
              <motion.label className="text-sm font-semibold mb-[10px]">
                Add cover image
              </motion.label>

              <FileUpload
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="serving__sizes my-[20px] flex flex-col "
            >
              <motion.label className="text-sm  font-semibold mb-[10px]">
                Serving Size
              </motion.label>

              <SelectServing />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="cooking__intstructions my-[20px]"
            >
              <label className="text-sm font-semibold mb-[10px] ">
                Cooking Instruction
              </label>

              <CustomInput />
            </motion.div>
            <motion.div variants={itemVariants} className="author__notes">
              <label className="text-sm font-semibold mb-[10px] ">
                Author notes
              </label>
              <textarea
                className="rounded-3xl text-[#7c7c7c] text-sm px-4 py-5 flex items-center bg-gray-50 outline-none w-full lg:w-[30%] overflow-hidden resize-none "
                placeholder="Add tips and tricks 🤗"
                name="authornote"
                value={values.authorNote}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="button my-[20px]">
              <Button size="large" type="submit" disable={values.title === ""}>
                Done
              </Button>
            </motion.div>
          </motion.form>
        )}
      </Formik>
    </motion.div>
  );
};

export default AddRecipeForm;
