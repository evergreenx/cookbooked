import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { UseUser } from "@/providers/AuthProviders";

interface UserAvatarProps {
  sizes: 'small' | 'large';
}

const UserAvatar = ({ sizes }: UserAvatarProps) => {
  const { user, loading } = UseUser();

  let sizeClass = "";
  switch (sizes) {
    case "large":
      sizeClass = "w-[100px] h-[100px]";
      break;

    case "small":
      sizeClass = "w-[30px] h-[30px]";
      break;

    default:
      break;
  }

  return (
    <div className=" border-[8px] rounded-full border-[#fff]">
      {user && (
        <Avatar.Root
          className={`bg-red-200 inline-flex cursor-pointer  ${sizeClass} select-none items-center justify-center overflow-hidden rounded-full align-middle`}
        >
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={user?.prefs.imageUrls}
            alt={user?.name}
          />
          <Avatar.Fallback
            className="text-white leading-1 flex h-full w-full items-center justify-center bg-zinc-950 text-[15px] font-medium"
            delayMs={600}
          >
            {user?.name.substring(0, 2)}
          </Avatar.Fallback>
        </Avatar.Root>
      )}
    </div>
  );
};

export default UserAvatar;
