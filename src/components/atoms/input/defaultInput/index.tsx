import { messageIcon } from "@/assets";
import Image from "next/image";
import { ChangeEventHandler } from "react";

interface InputProps {
  className?: string;
  type?: string;
  value?: string | number;
  onChange?: ChangeEventHandler;
  placeholder?: string;
  label?: string;
  readOnly?: boolean;
  name?: string;
  onBlur?: any;
}

const DefaultInput = ({
  type,
  className,
  value,
  onChange,
  placeholder,
  label,
  readOnly,
  name,
  onBlur,
}: InputProps) => {
  return (
    <div className="flex border-[#D0DBEA] rounded-[10px] border bg-[#fff] h-[56px] w-full   mx-auto p-2">

        <Image src={messageIcon} alt="messageIcon"  className="mr-[14px]" />
      <input
        type={type}
        placeholder={placeholder}
        className="
        text-[15px]
   
        font-medium
        text-[#9FA5C0]
    outline-none
        w-full "
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        readOnly={readOnly}
      />
    </div>
  );
};

export default DefaultInput;
