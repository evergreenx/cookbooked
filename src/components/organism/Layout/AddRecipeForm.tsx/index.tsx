// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@/components/atoms/Button";

const AddRecipeForm = () => {
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
          <form onSubmit={handleSubmit} >
            <div className="title flex flex-col my-[20px]">
              <label className="text-sm font-semibold mb-[10px]">
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded-3xl text-[#7c7c7c] p-4 bg-gray-100 outline-none w-[30%] "
                value={values.title}
                placeholder="Type your recipe name here"
              />
              {errors.title && touched.title && errors.title}
            </div>

            <div className="title flex flex-col my-[20px]">
              <label className="text-sm font-semibold mb-[10px]">
              Add cover image
              </label>
              <div
              
                className="border rounded-2xl border-dashed text-[#7c7c7c86] p-4 h-[120px] w-[150px] outline-none text-sm text-center cursor-pointer items-center flex  "
      
              
                >
                    Add Cover image
                </div>
              {errors.title && touched.title && errors.title}
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
