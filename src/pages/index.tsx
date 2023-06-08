import Button from "@/components/atoms/Button";
import { UseUser } from "@/providers/AuthProviders";
import { useRouter } from "next/router";
import React, { useEffect, ReactElement } from "react";
import { Toaster } from "react-hot-toast";
import { ID, Permission, Role, Query } from "appwrite";
import { client, databases, account } from "@/appwrite/config";
import Image from "next/image";
import type { NextPageWithLayout } from "./_app";
import Header from "@/components/molecules/Header";
import AppLayout from "@/components/organism/Layout/AppLayout";
import { FabButton } from "@/components/molecules/FabButton";

const Page: NextPageWithLayout = () => {
  const { user, logout, loading } = UseUser();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    const promise = databases.listDocuments(
      "647ba64bca1fc8a8992e",
      "647ba64bca1fc8a8992e",
      [Query.equal("userId", [user?.$id])]
      // [Query.limit(1)]
      // [Query.select(["createdAt", "DESC"])]
      // [Query.equal("title", ["Iron Man"])]
    );

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  }, []);

  // useEffect(() => {
  //   const promise = account.updatePrefs({
  //     imageUrls: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png'
  //   });

  //   promise.then(
  //     function (response) {
  //       console.log(response , 'ref'); // Success
  //     },
  //     function (error) {
  //       console.log(error); // Failure
  //     }
  //   );
  // }, []);

  // useEffect(() => {

  //   const promise =  databases.createDocument(
  //     "647ba64bca1fc8a8992e",
  //     "647ba6595c710fc68a50",

  //     ID.unique(),
  //     {
  //       cookTime: 10,
  //       createdAt: "2023-06-04T01:05:20.168+00:00",
  //       servings: 1,
  //       recipe_name: "please soup",
  //       ingredients: ["rice", "oil", "beans", "food"],
  //       userId: user?.$id,
  //       instructions: ["rinse  rice ", "boil rice "],
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  //     },
  //     [
  //       Permission.read(Role.user(user["$id"])),
  //       Permission.write(Role.user(user["$id"])),
  //     ]
  //   );

  //   promise.then(
  //     function (response) {
  //       console.log(response); // Success
  //     },
  //     function (error) {
  //       console.log(error); // Failure
  //     }
  //   );
  // }, [user]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) {
    router.push("/auth/signin");
    return <div>redirecting...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-center text-xl my-5">
        {user && "logged in as " + user.name}

        <FabButton />
        {user && user.prefs.imageUrls && (
          <Image
            src={user.prefs.imageUrls}
            alt="profile"
            width={20}
            height={30}
          />
        )}
      </h1>
      <Button size="medium" onClick={() => logout()}>
        logout
      </Button>

      <Toaster />
    </div>
  );
};

export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  console.log(page, "page");
  return <AppLayout>{page}</AppLayout>;
};
