import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Button from "../Button";
import { UseUser } from "@/providers/AuthProviders";
import { Form, useFormik } from "formik";
import * as Yup from "yup";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

const EditProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "name too short 😑")
    .max(20, "name Too Long 🥱!")
    .required("required"),
  bio: Yup.string().min(10, "bio too short 😑").max(50, "bio Too Long 🥱!"),
});

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

interface Props {
    setShowSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showSuccessDialog: boolean;
}

const RecipeSuccess = ({ setShowSuccessDialog, showSuccessDialog }: Props) => {
  const { user, loadingFeedback, updateUserDetails } = UseUser();
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog.Root open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#16161651] data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[24px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Player
            autoplay
            loop
            src="https://assets7.lottiefiles.com/packages/lf20_7fLWQz6yvy.json"
            style={{ width: "260px" }}
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>

          <div className="">
            <h1 className="text-[#3E5481] text-[22px] font-bold text-center mb-[8px]">
              Upload Success
            </h1>

            <p className="my-5 text-[15px] text-[#2E3E5C] font-medium text-center tracking-tighter mb-[24px] ">
              Your recipe has been uploaded, you can see it on your profile
            </p>

            <Button size="medium">
              <Link href="/" className="text-white text-[15px] font-bold ">
                Back to Home
              </Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default RecipeSuccess;
