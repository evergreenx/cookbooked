import UserAvatar from "@/components/atoms/Avatar";
import { UseUser } from "@/providers/AuthProviders";
import React from "react";

const Header = ({
  user
}:any) => {
  console.log(user, "tee");
  return (
    <div className=" h-14  text-red-200 flex justify-end ">
      {/* <UserAvatar
        name={user?.name}
        imageurl={user?.prefs.imageUrls}
        width={50}
        height={50}
      /> */}
    </div>
  );
};

export default Header;
