import { ChangeEventHandler, useState } from "react";
import { tooglepassword, lockIcon } from "../../../../assets";
import styles from "./password-input.module.css";
import Image from "next/image";

interface InputProps {
  className?: string;
  id?: string;
  onChange?: ChangeEventHandler;
  placeholder?: string;
  value?: string;
  name?: string;
  onBlur?: ChangeEventHandler;
}

const PasswordInput = ({
  id,
  className,
  onChange,
  placeholder,
  value,
  name,
  onBlur,
}: InputProps) => {
  const [inputType, setInputType] = useState("password");

  const togglePassword = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  return (
    <div className="flex border-[#D0DBEA] rounded-[10px] w-full   border bg-[#fff] h-[56px]  mx-auto p-2">
      <Image src={lockIcon} alt="lock icon" className="mr-[14px]" />
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        className="
        text-[15px]
   
        font-medium
        text-[#9FA5C0]
    outline-none
        w-full "
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        name={name}
      />
      {inputType === "password" ? (
        <Image
          src={tooglepassword}
          alt="toggle password"
          onClick={togglePassword}
        />
      ) : (
        <Image
          src={tooglepassword}
          alt="toggle password"
          onClick={togglePassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
