import { observer } from "@/store";
import { useStore } from "@/hooks";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ethereumEncode } from "@zcloak/crypto";
import { FEEDBACK_FORM_URL } from "@/constants";
import DefaultAvatar from "@/assets/images/avatar.jpg";

export default observer(function AccountPage() {
  const { User } = useStore();
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    User.logout();
    navigate("/login");
  }, [User]);
  return (
    <div className="h-100vh pb-20">
      <div className="flex flex-col bg-[#273238] h-[350px] w-full p-5 gap-8 items-center">
        <div className="font-extrabold text-center text-white text-lg">
          Account
        </div>
        <div className="avatar">
          <div className="rounded-full border-4 border-neutral-400 w-20">
            <img src={User.profile?.avatar || DefaultAvatar} />
          </div>
        </div>
        <div className="font-bold h-4 text-center text-white text-base leading-relaxed w-64">
          My Key
        </div>
        <div className="font-normal text-center text-white text-sm leading-snug w-full opacity-80 break-words">
          {User.profile?.public_key &&
            ethereumEncode(`0x${User.profile.public_key}`)}
        </div>
      </div>
      <div className="flex flex-col p-5 gap-5 items-center">
        <a href={FEEDBACK_FORM_URL} target="_blank" className="w-full btn">
          Submit Feedback
        </a>
        <button
          className="bg-gray-800 text-white text-base w-full btn"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
});
