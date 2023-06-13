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

const FileUpload = ({
  setSelectedImage,
  selectedImage,
  setImageId,
}: FileUploadProps) => {
  const { user } = UseUser();

  const [loadImage, setLoadImage] = useState(false);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setSelectedImage(reader.result);


        if (file) uploadImage(file); // Call the uploadImage function with the new file
      }
    };

    if (file) {
      setLoadImage(true);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = (file: File) => {
    const promise = storage.createFile(
     process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
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
          setImageId(response.$id);
          toast.success("Image uploaded successfully.");
        },
        function (error) {
          toast.error(error.message);
        }
      )
      .finally(function () {
        setLoadImage(false);
      });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageId(null);
  };

  return (
    <div>
      {loadImage && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#0000008a] flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-5">
            <p className="text-center">Uploading...</p>
          </div>
        </div>
      )}
      <div className="border flex-col rounded-2xl border-dashed text-[#7c7c7c86] p-1 h-[120px] w-[150px] outline-none text-xs text-center cursor-pointer items-center justify-center flex">
        {selectedImage ? (
          <div className="relative">
            <Image src={selectedImage} alt="Selected" width="80" height={"80"}
            className="min-w-[80px] min-h-[80px]"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 p-1 bg-white rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 19a9 9 0 100-18 9 9 0 000 18zm1-9h3a1 1 0 010 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 010-2h3V6a1 1 0 012 0v3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
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