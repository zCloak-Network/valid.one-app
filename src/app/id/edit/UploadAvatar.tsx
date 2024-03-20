import React, { useCallback, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import EditAvatar from "@/assets/svg/icon/icon_edit_ava.svg?react";

interface Props {
  onChange: (files: File) => void;
}

const UploadAvatar: React.FC<Props> = ({ onChange }) => {
  const [previewUrls, setPreviewUrls] = useState<string>(); // 存储图片预览 URL

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setPreviewUrls(URL.createObjectURL(acceptedFiles[0]));
      onChange(acceptedFiles[0]);
    },
    [onChange, setPreviewUrls]
  );

  const options: DropzoneOptions = {
    onDrop,

    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1024 * 1,
  };

  const { getRootProps, getInputProps } = useDropzone(options);

  return (
    <div {...getRootProps()} className="w-24 h-24 bg-black rounded-full relative">
      <input {...getInputProps()} />
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={previewUrls} />
        </div>
      </div>
      <div className="bg-white w-8 h-8 rounded-full shadow absolute flex items-center justify-center bottom-0 right-[-4px]">
        <EditAvatar />
      </div>
    </div>
  );
};

export default UploadAvatar;
