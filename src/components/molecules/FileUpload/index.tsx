import { storage } from "@/appwrite/config";
import { cameraIcon } from "@/assets";
import Image from "next/image";
import { ID, Permission, Role } from "appwrite";
import React, { ChangeEvent, useRef, useState } from "react";
import { UseUser } from "@/providers/AuthProviders";
import { toast } from "react-hot-toast";

interface FileUploadProps {
  selectedImage: any;
  setSelectedImage: any;
  setImageId: any;
}

const FileUpload = ({ setSelectedImage, selectedImage  , setImageId}: FileUploadProps) => {
  const { user } = UseUser();

  const [loadImage, setLoadImage] = useState(false);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };

    if (file) {
      setLoadImage(true);

      reader.readAsDataURL(file);
      const promise = storage.createFile(
        "648496feb5ff0dcec87d",
        ID.unique(),
        file,
        [
          Permission.write(Role.user(user["$id"])),

          Permission.read(Role.any()), // Anyone can view this document
          Permission.update(Role.user(user["$id"])),
          Permission.delete(Role.user(user["$id"])),
        ]
      );

      promise
        .then(
          function (response) {
            console.log(response, "upload");
            
            setImageId(response.$id)
            // Success
          },
          function (error) {
            console.log(error, "fail upload");
            
            toast.error(error.message);
            // Failure
          }
        )
        .finally(function () {
          // To do something here
          setLoadImage(false);
        });
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
      {loadImage && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#0000008a] flex items-center justify-center">
          <div className="bg-white rounded-md p-5">
            <p className="text-center">Uploading...</p>
          </div>
        </div>
      )}
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
