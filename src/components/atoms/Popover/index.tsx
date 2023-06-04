import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const UserPopover = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button
        className="rounded-full cursor-pointer w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] outline-none"
        aria-label="Update dimensions"
      >
        <MixerHorizontalIcon />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="p-5 w-[200px] rounded-xl bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideDownAndFade data-[state=open]:data-[side=left]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=bottom]:animate-slideLeftAndFade"
        sideOffset={5}
      >
        <div className="flex flex-col gap-2.5">
          <Link
            href={"/profile"}
            className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5"
          >
            Profile
          </Link>
          <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
            Settings
          </p>
        </div>
        <Popover.Close
          className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4  outline-none cursor-default"
          aria-label="Close"
        >
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default UserPopover;
