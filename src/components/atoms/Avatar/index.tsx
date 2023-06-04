import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { UseUser } from "@/providers/AuthProviders";

interface UserAvatarProps {
  name: string;
  imageurl: string;
  width?: number;
  height?: number;
}

const UserAvatar = ({ name, imageurl, width, height }: UserAvatarProps) => {


const {user} = UseUser()
return (
  <div className=" border-[8px] rounded-full border-[#fff]">
    <Avatar.Root className={`bg-red-200 inline-flex h-[${height}px] w-[${width}px] select-none items-center justify-center overflow-hidden rounded-full align-middle`}>
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={imageurl}
        alt={name}
      />
      <Avatar.Fallback
        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        {name?.substring(0, 2)}
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);
}

export default UserAvatar;
