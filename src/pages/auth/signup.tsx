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
import { UseUser } from "@/providers/AuthProviders";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "@/components/atoms/Loader";

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
  const router = useRouter();
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

  const { signup, loading, user , loadingFeedback } = UseUser();

  const handleSignup = (e: any) => {
    e.preventDefault();
    signup(formik.values.email, formik.values.password, formik.values.username);
  };

  if (loading) {
    return <Loader />;
  }


  if (user) {
    router.push("/");
  }

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

      <p className="text-[#9FA5C0] font-medium text-[15px] text-center mt-[8px] mb-[32px] tracking-[0.5px]
      ">
        Please enter your account details here
      </p>

      <form onSubmit={handleSignup}>
        <motion.div variants={inputVariants} className="email mb-[16px]">
          <DefaultInput
                     placeholder="Email"

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
            !formik.isValid
            }
          >
           {loadingFeedback ? (
             <div role="status">
             <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#F5484A]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
             </svg>
             <span className="sr-only">Loading...</span>
         </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </motion.div>
      </form>

      <p className="text-[#2E3E5C] font-medium text-[15px] mt-[28px] ">
      have an account?{" "}
        <Link  href="/auth/signin" className="text-brandColor font-bold">
          Signin
        </Link>
      </p>
      <Toaster />
    </motion.div>
  );
};

export default Signup;
