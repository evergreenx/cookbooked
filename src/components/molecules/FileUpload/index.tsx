import { cameraIcon } from "@/assets";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

interface FileUploadProps {
  selectedImage: any;
  setSelectedImage: any;
}

const FileUpload = ({ setSelectedImage, selectedImage }: FileUploadProps) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div>
      <div className="border flex-col rounded-2xl border-dashed text-[#7c7c7c86] p-1 h-[120px] w-[150px] outline-none text-xs text-center cursor-pointer items-center justify-center flex">
        {selectedImage ? (
          <Image src={selectedImage} alt="Selected" width="80" height={"80"} />
        ) : (
          <>
            <button
              onClick={handleFileInputClick}
              type="button"
              className="flex items-center justify-center flex-col space-y-[5px]   h-[120px] w-full
                    
                    hover:bg-[#ffffffe3]
                    "
            >
              <input
                type="file"
                required
                className="hidden"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <Image src={cameraIcon} alt="camera" />
              <p>Add Cover image</p>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
