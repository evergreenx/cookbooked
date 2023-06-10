import React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const recipeCategories = [
  { id: 1, name: 'Appetizers/Snacks' },
  { id: 2, name: 'Soups and Stews' },
  { id: 3, name: 'Salads' },
  { id: 4, name: 'Main Dishes/Entrees' },
  { id: 5, name: 'Pasta and Noodles' },
  { id: 6, name: 'Rice and Grains' },
  { id: 7, name: 'Vegetarian/Vegan' },
  { id: 8, name: 'Seafood' },
  { id: 9, name: 'Poultry' },
  { id: 10, name: 'Beef' },
  { id: 11, name: 'Pork' },
  { id: 12, name: 'Lamb' },
  { id: 13, name: 'Sandwiches/Wraps' },
  { id: 14, name: 'Pizza' },
  { id: 15, name: 'Breakfast/Brunch' },
  { id: 16, name: 'Desserts' },
  { id: 17, name: 'Baking' },
  { id: 18, name: 'Beverages' },
  { id: 19, name: 'Smoothies/Juices' },
  { id: 20, name: 'Slow Cooker/Crockpot' }
];
const SelectCategory = ({
  setCategory,
}: {
  setCategory: React.Dispatch<React.SetStateAction<
    any
  >>;
}) => (
  <Select.Root
    onValueChange={(value) => {
      setCategory(value);
    }}
    required
  >
    <Select.Trigger
      className="inline-flex  rounded-3xl items-center  px-[15px] py-[10px] text-[13px] leading-none h-[40px] gap-[5px] bg-gray-50 text-violet11  data-[placeholder]:text-violet9 outline-none"
      aria-label="Food"
    >
      <Select.Value placeholder="sizes…" />
      <Select.Icon className="text-violet11">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden w-[200px] bg-white rounded-md ">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
              Recipe Category
            </Select.Label>
            {
              recipeCategories.map((category) => (
                <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
              ))


            }

            {/* <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem> */}
          </Select.Group>

          <Select.Separator className="h-[1px] bg-violet6 m-[5px]" />
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; value: string }
>(({ children, className, value, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={classnames(
        "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
        className
      )}
      value={value}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";

SelectItem.displayName = "SelectItem";
export default SelectCategory;
