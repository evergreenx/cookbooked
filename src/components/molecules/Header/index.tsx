import UserAvatar from "@/components/atoms/Avatar";
import UserDropMenu from "@/components/atoms/DropMenu";
import UserPopover from "@/components/atoms/Popover";
import { UseUser } from "@/providers/AuthProviders";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className=" h-14  flex justify-between px-10 py-5 ">
      <Link href="/">
      <h1 className="font-bold">Home</h1>
      </Link>

      <UserDropMenu />
    </div>
  );
};

export default Header;
