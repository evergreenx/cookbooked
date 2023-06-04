import UserAvatar from "@/components/atoms/Avatar";
import UserPopover from "@/components/atoms/Popover";
import { UseUser } from "@/providers/AuthProviders";
import React from "react";

const Header = () => {

  return (
    <div className=" h-14  text-red-200 flex justify-end p-4 ">


<UserPopover />
      {/* <UserAvatar width={100} height={100} /> */}
    </div>
  );
};

export default Header;
