import { observer } from "@/store";
import AccountBg from "@/assets/svg/account_bg.svg";
import { useStore } from "@/hooks";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ethereumEncode } from "@zcloak/crypto";

export default observer(function AccountPage() {
  const { User } = useStore();
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    User.clearUser();
    navigate("/login");
  }, [User]);
  return (
    <div className="h-[100vh] pb-20">
      <div
        className="h-[350px] w-full p-5 flex flex-col items-center gap-8"
        style={{
          backgroundImage: `url(${AccountBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white text-lg font-extrabold">
          Account
        </div>
        <div className="avatar">
          <div className="w-20 rounded-full border-4 border-neutral-400">
            <img src={User.profile?.avatar} />
          </div>
        </div>
        <div className="w-64 h-4 text-center text-white text-base font-bold leading-relaxed">
          My Key
        </div>
        <div className="w-full opacity-80 text-center text-white text-sm font-normal leading-snug break-words">
          {User.profile?.public_key &&
            ethereumEncode(`0x${User.profile.public_key}`)}
        </div>
      </div>
      <div className="p-5 flex items-center flex-col gap-5">
        <button className="btn w-full">Submit Feedback</button>
        <button
          className="btn bg-gray-800 w-full text-white text-base"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
});
