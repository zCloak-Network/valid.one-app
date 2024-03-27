import ShareIcon from "@/assets/svg/icon/icon_link.svg?react";
import { useStore } from "@/hooks";
import { useMemo } from "react";
import { useCopyToClipboard } from "react-use";

export default function () {
  const { User } = useStore();
  const [_, copy] = useCopyToClipboard();
  const qrLink = useMemo(() => `${import.meta.env.VITE_APP_VALID_ID_URL}/user/${User.id}`, [User.id]);

  return (
    <div className="w-full">
      <button
        className="btn w-full bg-white bg-opacity-20 rounded-lg text-white border-none"
        onClick={() => copy(qrLink)}
      >
        <ShareIcon />
        Share Profile
      </button>
    </div>
  );
}
