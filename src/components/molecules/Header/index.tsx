import UserAvatar from "@/components/atoms/Avatar";
import UserDropMenu from "@/components/atoms/DropMenu";
import UserPopover from "@/components/atoms/Popover";
import { UseUser } from "@/providers/AuthProviders";
import React from "react";

const Header = () => {
  return (
    <div className=" h-14  text-red-200 flex justify-end px-10 py-5 ">

      <UserDropMenu />
    </div>
  );
};

export default Header;
