import React, { useEffect, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import EditAvatar from "@/assets/svg/icon/icon_edit_ava.svg?react";

interface Props {
  onChange: (files: File) => void;
  onError?: (error: Error) => void;
  url?: string;
}

const UploadAvatar: React.FC<Props> = ({ onChange, url, onError }) => {
  const [previewUrls, setPreviewUrls] = useState<string | undefined>(); // 存储图片预览 URL
  // TODO 最大文件大小 5MB
  const maxSize = 1024 * 1024 * 5;
  const options: DropzoneOptions = {
    maxFiles: 1,

    accept: {
      "image/*": [],
    },
    maxSize,
    onError,
    validator(file) {
      if (file.size > maxSize) {
        return {
          code: "file-too-large",
          message: `File is larger than 5MB`,
        };
      }

      return null;
    },
  };

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone(options);

  useEffect(() => {
    if (acceptedFiles.length) {
      setPreviewUrls(URL.createObjectURL(new Blob(acceptedFiles)));
      onChange(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <div
      {...getRootProps()}
      className="w-24 h-24 bg-black rounded-full relative"
    >
      <input {...getInputProps()} />
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={previewUrls || url} />
        </div>
      </div>
      <div className="bg-white w-8 h-8 rounded-full shadow absolute flex items-center justify-center bottom-0 right-[-4px]">
        <EditAvatar />
      </div>
    </div>
  );
};

export default UploadAvatar;
