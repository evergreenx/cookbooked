// Render Prop
import React, { ChangeEvent, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@/components/atoms/Button";
import { cameraIcon } from "@/assets";
import Image from "next/image";

const AddRecipeForm = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  //   TODO : extract file uploader to a seperate component
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileOnChange = (changeEvent: any) => {
    changeEvent.preventDefault();
    const file = changeEvent.target.files[0];
    console.log(file);
  };
  return (
    <div>
      <Formik
        initialValues={{ title: "", coverImage: "", servicingSize: "" }}
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
          <form onSubmit={handleSubmit}>
            <div className="title flex flex-col my-[20px]">
              <label className="text-sm font-semibold mb-[10px]">
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded-3xl text-[#7c7c7c] p-4 bg-gray-50 outline-none w-[30%] "
                value={values.title}
                placeholder="Type your recipe name here"
              />
              {errors.title && touched.title && errors.title}
            </div>

            <div className="border flex-col space-y-[5px] rounded-2xl border-dashed text-[#7c7c7c86] p-1 h-[120px] w-[150px] outline-none text-xs text-center cursor-pointer items-center justify-center flex">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="Selected"
                  width="80"
                  height={"80"}
                />
              ) : (
                <>
                  <button
                    onClick={handleFileInputClick}
                    type="button"
                    className="flex items-center justify-center flex-col  h-[120px] w-full
                    
                    hover:bg-[#ffffffe3]
                    "
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                    <Image src={cameraIcon} alt="camera" />
                    <p>Add Cover image</p>
                  </button>
                </>
              )}
            </div>

            <div className="button my-[20px]">
              <Button size="large" type="submit">
                Done
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;
