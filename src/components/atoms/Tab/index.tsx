import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import YourRecipe from "./YourRecipe";
import SavedRecipe from "./SavedRecipe";

interface Props {
  userRecipe: any;
  loadingRecipe: boolean;
}

const UserTabs = ({ userRecipe, loadingRecipe }: Props) => (
  <Tabs.Root className="flex flex-col my-10 " defaultValue="tab1">
    <Tabs.List
      className="shrink-0 flex mb-[25px] w-[300px]"
      aria-label="Manage your account"
    >
      <Tabs.Trigger
        className="bg-white
        text-brandColor font-bold  data-[state=active]:hover:bg-red-400
        px-5 h-[45px] flex-1 flex items-center justify-center
         text-[12px] leading-none text-mauve11 select-none rounded-[10px] hover:text-violet11 
         data-[state=active]:text-violet11  w-[100px]
         data-[state=active]:focus:relative data-[state=active]:bg-brandColor data-[state=active]:text-[#fff] 
           outline-none cursor-default"
        value="tab1"
      >
        Your recipe
      </Tabs.Trigger>
      <Tabs.Trigger
        className="bg-white
        text-brandColor font-bold
        data-[state=active]:hover:bg-red-400
        px-5 h-[45px] flex-1 flex items-center justify-center
         text-[12px] leading-none text-mauve11 select-none rounded-[10px] hover:text-violet11 
         data-[state=active]:text-violet11  
         data-[state=active]:focus:relative data-[state=active]:bg-brandColor data-[state=active]:text-[#fff] 
           outline-none cursor-default"
        value="tab2"
      >
        Saved recipe
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content
      className="grow  bg-white rounded-b-md outline-none  "
      value="tab1"
    >
      <YourRecipe />
    </Tabs.Content>
    <Tabs.Content
      className="grow  bg-white rounded-b-md outline-none  "
      value="tab2"
    >
      <SavedRecipe />
    </Tabs.Content>
  </Tabs.Root>
);

export default UserTabs;
