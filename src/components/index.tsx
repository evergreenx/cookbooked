import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { Value } from "@radix-ui/react-select";

interface CookingDurationSliderProps {
  setCookingDuration: any;
  cookingDuration: any;
}

const CookingDurationSlider = ({
  setCookingDuration,
  cookingDuration,
}: CookingDurationSliderProps) => {
  const renderLabels = () => {
    if (cookingDuration) {
      return (
        <>
          <p className="text-sm text-brandColor">{cookingDuration}</p>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <form className="my-[20px]">
      <div className="flex justify-between w-[200px] mb-[9px]">
        <p
          className={`${
            cookingDuration < 10 ? "text-brandColor font-bold" : ""
          }`}
        >
          &lt;10
        </p>

        <p
          className={`${
            cookingDuration >= 30 ? "text-brandColor font-bold" : ""
          }`}
        >
          30
        </p>

        <p
          className={`${
            cookingDuration >= 60 ? "text-brandColor font-bold" : ""
          }`}
        >
          &gt;60
        </p>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-[200px] h-5"
        defaultValue={[cookingDuration]}
        value={[cookingDuration]}
        onValueChange={(value) => setCookingDuration(value[0])}
        max={60}
        step={3}
        minStepsBetweenThumbs={3}
      >
        <Slider.Track className="bg-[#F4F5F7] relative grow rounded-full h-[8px]">
          <Slider.Range className="absolute bg-[#F5484A] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-[24px] h-[24px] bg-[#F5484A] shadow-[0_2px_10px] rounded-[32px] hover:bg-[#F5484A] focus:outline-none  "
          aria-label="Volume"
        />
      </Slider.Root>

      {renderLabels()}
    </form>
  );
};

export default CookingDurationSlider;
