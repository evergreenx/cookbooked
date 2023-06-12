import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import UserAvatar from "../Avatar";
import Link from "next/link";
import { UseUser } from "@/providers/AuthProviders";
import { favIcon, unionIcon } from "@/assets";
import Image from "next/image";

export const UserDropMenu = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  const { logout } = UseUser();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <UserAvatar sizes="small" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[120px]   bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=left]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={10}
          alignOffset={5}
        >
          <Link href="/profile">
            <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
              Profile{" "}
            </DropdownMenu.Item>
          </Link>

          <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            {" "}
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

          <DropdownMenu.Item
            onClick={() => {
              logout();
            }}
            className="group cursor-pointer text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            {" "}
            Logout
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface UserCardOptionsProps {
  handleDeleteRecipe: () => void;
}

export const UserCardOptions = ({
  handleDeleteRecipe,
}: UserCardOptionsProps) => {
  const { logout } = UseUser();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div
          className="w-[32px] h-[32px] 
      cursor-pointer
      top-4 right-4 absolute items-center flex justify-center z-50 bg-[#fff] rounded-full"
        >
          <Image src={unionIcon} alt="delete icon" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[100px]   bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=left]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={10}
          alignOffset={5}
        >
          <DropdownMenu.Item
            onClick={() => {
              handleDeleteRecipe();
            }}
            className="group text-[13px] 
            cursor-pointer
            leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            delete
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="group 
          cursor-pointer
          text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            {" "}
            edit
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface FavCardOptionsProps {
  handleAddToFav?: () => void;
}

export const FavCardOptions = ({ handleAddToFav }: FavCardOptionsProps) => {
  const { logout } = UseUser();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger onClick={handleAddToFav} asChild>
        <div
          className="w-[32px] h-[32px] 
      cursor-pointer
      top-4 right-4 absolute items-center flex justify-center z-50 bg-[#fff] rounded-full"
        >
          <Image src={favIcon} alt="fav" />
        </div>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  );
};
