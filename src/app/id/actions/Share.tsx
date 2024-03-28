import ShareIcon from "@/assets/svg/icon/icon_link.svg?react";
import { useStore } from "@/hooks";
import { useMemo } from "react";
import { useCopyToClipboard, useToggle } from "react-use";
import { siteConfig } from "@/constants";

export default function () {
  const { User } = useStore();
  const [_, copy] = useCopyToClipboard();
  const qrLink = useMemo(() => `${siteConfig.url}/user/${User.id}`, [User.id]);
  const [isCopy, toggle] = useToggle(false);

  const copyClick = () => {
    copy(qrLink);
    toggle();
  };

  return (
    <div className={`w-full ${isCopy ? "tooltip" : ""}`} data-tip="Copied">
      <button
        className="btn w-full bg-white bg-opacity-20 rounded-lg text-white border-none text-xs"
        onClick={copyClick}
      >
        <ShareIcon />
        Share Profile
      </button>
    </div>
  );
}
