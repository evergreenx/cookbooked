import { motion } from "framer-motion";
import DefaultInput from "@/components/atoms/input/defaultInput";
import PasswordInput from "@/components/atoms/input/passwordInput";
import React from "react";
import Button from "@/components/atoms/Button";
import { Form, useFormik } from "formik";
import * as Yup from "yup";
import { Account, ID } from "appwrite";
import toast, { Toaster } from "react-hot-toast";
import { client } from "@/appwrite/config";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),
});
const Signup = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3, // Delay before starting the animation of children
        staggerChildren: 0.2, // Delay between each child animation
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSignup = (e: any) => {
    e.preventDefault();

    const account = new Account(client);

    const promise = account.create(
      ID.unique(),

      formik.values.email,
      formik.values.password,
      formik.values.username
    );

    promise
      .then(function (response: any) {
        toast("Account created successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      })

      .finally(() => {
        // toast('Here is your toast.');
      });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col h-screen w-full  mx-auto justify-center items-center  p-1"
    >
      <h2 className="text-[#2E3E5C] text-[22px] font-bold text-center">
        Sign Up Here!
      </h2>

      <p className="text-[#9FA5C0] font-medium text-[15px] text-center mt-[8px] mb-[32px]">
        Please enter your account details here
      </p>

      <form onSubmit={handleSignup}>
        <motion.div variants={inputVariants} className="email mb-[16px]">
          <DefaultInput
            placeholder="Email or phone number"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs ">{formik.errors.email}</div>
          ) : null}
        </motion.div>

        <motion.div variants={inputVariants} className="username mb-[16px]">
          <DefaultInput
            placeholder="Username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-xs ">
              {formik.errors.username}
            </div>
          ) : null}
        </motion.div>

        <motion.div variants={inputVariants} className="password">
          <PasswordInput
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            onBlur={formik.handleBlur}
            placeholder="Password ...."
          />

          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-xs ">
              {formik.errors.password}
            </div>
          ) : null}
        </motion.div>

        <motion.div variants={inputVariants} className="button mt-[20px]">
          <Button
            size="large"
            type="submit"
            disable={
              formik.values.email === "" ||
              formik.values.username === "" ||
              formik.values.password === ""
            }
          >
            Sign Up
          </Button>
        </motion.div>
      </form>
      <Toaster />
    </motion.div>
  );
};

export default Signup;
