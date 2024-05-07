import { Link } from "react-router-dom";
import IconBack from "@/assets/svg/icon/icon_back.svg?react";

export const ChannelHead = function ({
  path,
  title,
  hideBack,
}: {
  path: string;
  title: string;
  hideBack?: boolean;
  [key: string]: any;
}) {
  return (
    <div className="flex py-4 items-center relative">
      {!hideBack && (
        <Link
          className="border rounded-lg border-zinc-300 p-2 absolute"
          to={path}
          replace
        >
          <IconBack />
        </Link>
      )}
      <p className="font-bold mx-auto text-lg text-gray-800">{title}</p>
    </div>
  );
};
