import { useState, useEffect, useMemo } from "react";
import { observer } from "@/store";
import { useStore, usePasskeyAuth } from "@/hooks";
import {
  useLoaderData,
  LoaderFunctionArgs,
  useNavigate,
  Link,
} from "react-router-dom";
import Logo from "@/assets/landing-page/logo.png";
import Alpha from "@/assets/landing-page/alpha.png";
import { sha256OfString } from "@/utils";
import { useToast } from "@/components";
import initActor, { actor } from "@/utils/canister";
import type { challengeData } from "@/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const { challengeID } = params;
  await initActor();
  return { challengeID };
}

export default observer(function ChallengePage() {
  const toast = useToast();
  const { auth } = usePasskeyAuth();
  const { User } = useStore();
  const navigate = useNavigate();

  const { challengeID } = useLoaderData() as {
    challengeID: string;
  };

  if (!User.name) {
    navigate({
      pathname: "/login",
      search: `?redirect=${encodeURIComponent("/challenge/" + challengeID)}`,
    });
  }

  const [loading, setLoading] = useState(false);
  const [challengeData, setChallengeData] = useState<
    challengeData | undefined
  >();
  const [challengeSuccess, setChallengeSuccess] = useState(false);

  const messageSHA256 = useMemo(() => {
    return challengeData?.verifyContent
      ? sha256OfString(challengeData.verifyContent)
      : "";
  }, [challengeData]);

  useEffect(() => {
    if (challengeID && !loading) {
      setLoading(true);
      // load cont
      setTimeout(() => {
        setChallengeData({
          challengeID: 1,
          platform: "telegram",
          requestUser: {
            name: "mahuateng",
            avatar: "",
          },
          verifyContent: "fdgwsdg",
          createTime: 1,
        });
        setLoading(false);
      }, 2000);
    }
  }, [challengeID]);

  const sign = async () => {
    setLoading(true);
    try {
      const [authRequest] = await auth();

      const res = await actor.sign_insert(authRequest, 1, messageSHA256, "");
      console.log(User.id, challengeData, messageSHA256, "sign result", res);

      if ((res as any)["Ok"]?.signature) {
        // callback
        console.log((res as any)["Ok"]);
        setChallengeSuccess(true);
      } else {
        toast && toast({ type: "error", message: "sign fail" });
      }

      setLoading(false);
    } catch (err) {
      toast &&
        toast({
          type: "error",
          message: (err as Error)?.message || "auth fail",
        });
      setLoading(false);
    }
  };

  const contIsReady = () => {
    return messageSHA256.length > 0;
  };

  const handleUserConfirm = () => {
    if (loading || !contIsReady()) {
      return null;
    }
    sign();
  };

  return (
    <div className="h-[100vh] pt-20 flex flex-col items-center justify-center">
      <header className="absolute left-0 w-full top-0 h-20 flex items-center px-4 bg-[#fafbff] z-10 shadow-lg">
        <img src={Logo} alt="logo" className="h-[28px] w-[28px]" />
        <img src={Alpha} alt="alpha" className="h-[24px] ml-2" />
        <div className="flex-1"></div>
        <button className="btn ]">Valid ID:{User.id}</button>
      </header>
      {challengeData ? (
        <div className="rounded-lg bg-white shadow-2xl w-[60%] min-w-[300px] max-w-[640px]">
          <div className="border-b px-8 py-4 font-semibold">
            Valid One Telegram Challenge
          </div>
          <div className="p-8">
            {/* challengeID:{challengeID} */}
            <div className="mb-8">
              Your Telegram friend
              <kbd className="kbd mx-1">mayun</kbd>
              requests verification of your identity.
            </div>
            <div className="text-center">
              {challengeSuccess ? (
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="btn btn-sm btn-neutral bg-[#000000]"
                    disabled={!contIsReady()}
                    onClick={handleUserConfirm}
                  >
                    Back to telegram
                  </button>
                  <Link className="btn btn-sm btn-link" to={"/"}>
                    Valid One
                  </Link>
                </div>
              ) : (
                <button
                  className="btn btn-neutral bg-[#000000]"
                  disabled={!contIsReady()}
                  onClick={handleUserConfirm}
                >
                  {loading && <span className="loading loading-spinner"></span>}
                  Verify
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
});
