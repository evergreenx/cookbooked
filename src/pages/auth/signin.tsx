import { motion } from "framer-motion";
import DefaultInput from "@/components/atoms/input/defaultInput";
import PasswordInput from "@/components/atoms/input/passwordInput";
import React from "react";
import Button from "@/components/atoms/Button";
import { Form, useFormik } from "formik";
import * as Yup from "yup";
import { UseUser } from "@/providers/AuthProviders";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),
});
const Signup = () => {
  const router = useRouter();
  const { login, loading, error, user } = UseUser();
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
      password: "",
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(formik.values.email, formik.values.password);
  };

  if (loading) {
    return <div>Loading...</div>;
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
        Welcome back!
      </h2>

      <p className="text-[#9FA5C0] font-medium text-[15px] text-center mt-[8px] mb-[32px]">
        Please enter your account details here
      </p>

      <form onSubmit={handleSignIn}>
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
              formik.values.email === "" || formik.values.password === ""
            }
          >
            Signin
          </Button>
        </motion.div>
      </form>

      <Toaster position="bottom-center" reverseOrder={false} />
    </motion.div>
  );
};

export default Signup;
