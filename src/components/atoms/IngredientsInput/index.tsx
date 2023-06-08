import { trashIcon } from "@/assets";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomIngredientsInput = ({
  setGetIngredients
}:any) => {
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentStep(event.target.value);
  };

  const handleAddedInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;
    setSteps((prevSteps) => {
      const updatedSteps = [...prevSteps];
      updatedSteps[index] = value;
      return updatedSteps;
    });
  };

  const handleInputBlur = () => {
    if (currentStep.trim() !== "") {
      setSteps((prevSteps) => [...prevSteps, currentStep.trim()]);
    }
    setCurrentStep("");
  };

  const handleDeleteStep = (index: number) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  const getAllIngredients = (): string[] => {

    setGetIngredients(steps);
    return steps;
  };

  getAllIngredients();
  return (
    <div className="my-[15px]">
      <AnimatePresence>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <span className="text-xs text-gray-400 uppercase">
              {index + 1}{" "}
            </span>
            <div className=" bg-gray-50 rounded-3xl px-4 py-5 flex items-center w-full lg:w-[30%] mb-[15px]">
              <input
                className="text-[#7c7c7c]  bg-gray-50 w-full  outline-none text-sm overflow-hidden resize-none "
                placeholder="Add one or multiple steps"
                value={step}
                onChange={(event) => handleAddedInputChange(event, index)}
              />
              <button type="button" onClick={() => handleDeleteStep(index)}>
                <Image src={trashIcon} alt={"trashicon"} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <input
        className="rounded-3xl text-[#7c7c7c] text-sm px-4 py-5 flex items-center bg-gray-50 outline-none w-full lg:w-[30%] overflow-hidden resize-none "
        placeholder="Add Ingredients 🍟🍔🥠🥟🥠🌯"
        value={currentStep}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
    </div>
  );
};

export default CustomIngredientsInput;
