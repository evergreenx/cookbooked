import { UseUser } from "@/providers/AuthProviders";
import React, { ReactElement } from "react";
import Image from "next/image";
import UserAvatar from "@/components/atoms/Avatar";
import AppLayout from "@/components/organism/Layout/AppLayout";

const profile = () => {
  const { user, loading } = UseUser();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="   w-full py-3 px-5 ">
      <div className="wallpaper userBg h-52 w-full rounded-t-2xl"></div>
      {/* <h1 className="text-[#2E3E5C] font-semibold text-[24px]">My Profile</h1> */}

      <div className="useravatar flex justify-between items-center -mt-20 p-8 ">
        <UserAvatar width={120} height={120} />

        <button className="border-brandColor mt-10  border py-[8px] px-[16px] bg-white text-brandColor font-semibold text-sm rounded-[10px]">
          Edit Profile
        </button>
      </div>

      <div className="userdetails px-8">
        <div className="username">
          <h2 className="text-[#2E3E5C] font-semibold text-[20px] capitalize">
            {user?.name}
          </h2>
        </div>
      </div>

      <div className="userbio px-8">
        <div className="bio">
          <h2 className="text-[#A9A9A9] font-normal text-sm capitalize">
            bio goes here
          </h2>
        </div>
      </div>

      <div className="userreceipeinfo px-8 my-6 flex space-x-[47px] ">
        <div className="info">
          <h3 className="text-[#9FA5C0] font-normal text-xs capitalize">
            Recipe
          </h3>
          <h2 className="text-xl text-[#2E3E5C] font-semibold text-center">
            3
          </h2>
        </div>

        <div className="info">
          <h3 className="text-[#9FA5C0] font-normal text-xs capitalize">
            Saved Recipe
          </h3>
          <h2 className="text-xl text-[#2E3E5C] font-semibold text-center">
            3
          </h2>
        </div>
      </div>
    </div>
  );
};

export default profile;

profile.getLayout = function getLayout(page: ReactElement) {
  console.log(page, "page");
  return <AppLayout>{page}</AppLayout>;
};
