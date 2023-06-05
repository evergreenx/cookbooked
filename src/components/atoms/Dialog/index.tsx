import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Button from "../Button";

interface DialogProps {
  open: any;
}

const EditProfileDialog = ({ open }: DialogProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-brandColor mt-10 border py-[8px] px-[16px] bg-white text-brandColor font-semibold text-sm rounded-[10px]"
      >
        Edit Profile
      </motion.button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-[#16161651] data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-[#2E3E5C] m-0 text-[20px] font-semibold ">
          Edit profile
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Make changes to your profile here. Click save when you re done.
        </Dialog.Description>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label
            className="text-violet11 w-[90px] text-right text-[15px]"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="name"
            defaultValue="Pedro Duarte"
          />
        </fieldset>

        <fieldset className="mb-[15px] flex items-center gap-5">
          <label
            className="text-violet11 w-[90px] text-right text-[15px]"
            htmlFor="name"
          >
            Bio
          </label>
          <textarea
            rows={5}
            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex w-full flex-1 items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="name"
            defaultValue="Pedro Duarte"
          />
        </fieldset>

        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <Button size="outline">cancel</Button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <Button size="medium">save</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default EditProfileDialog;
