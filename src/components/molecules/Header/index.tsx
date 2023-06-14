import { UserDropMenu } from "@/components/atoms/DropMenu";
import { UseUser } from "@/providers/AuthProviders";
import Link from "next/link";
import { logo } from "@/assets";

import React from "react";
import Image from "next/image";

const Header = () => {
  const { user } = UseUser();
  return (
    <div className=" h-14  flex justify-between px-10 py-5 ">
      <Link href="/">
        <Image src={logo} alt="logo" width={50} height={50} />
      </Link>

      {user && <UserDropMenu
      
      />}
    </div>
  );
};

export default Header;
