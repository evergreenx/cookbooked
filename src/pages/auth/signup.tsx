import PasswordInput from "@/components/atoms/input/passwordInput";
import React from "react";

const signup = () => {
  return (
    <div>
      <h2 className="text-[#2E3E5C] text-[22px] font-bold">Sign Up Here!</h2>

      <p className="text-[#9FA5C0] font-medium text-[15px]">
        Please enter your account here
      </p>

      <PasswordInput placeholder="password ...." />
    </div>
  );
};

export default signup;
