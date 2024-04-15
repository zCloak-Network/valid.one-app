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
import { getChallenge, sendChallenge } from "@/api";

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

  if (User.profile && !User.id) {
    navigate({
      pathname: "/login",
      search: `?redirect=${encodeURIComponent("/challenge/" + challengeID)}`,
    });
  }

  if (User.profile && !User.profile?.public_key) {
    navigate({
      pathname: "/id/profile/edit",
      search: `?redirect=${encodeURIComponent("/challenge/" + challengeID)}`,
    });
  }

  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // TODO data loading
  const [challengeData, setChallengeData] = useState<
    challengeData | undefined
  >();
  const [challengeSuccess, setChallengeSuccess] = useState(false);

  const messageSHA256 = useMemo(() => {
    return challengeData?.challenge
      ? sha256OfString(challengeData.challenge)
      : "";
  }, [challengeData]);

  useEffect(() => {
    if (challengeID && !loading) {
      setInitLoading(true);
      // load cont
      getChallenge({ id: challengeID })
        .then((res) => {
          if (res.data) {
            setChallengeData(res.data);
          } else {
            toast &&
              toast({ type: "error", message: res.msg || "get data fail" });
          }

          setInitLoading(false);
        })
        .catch(() => {
          setInitLoading(false);
        });
    }
  }, [challengeID]);

  const sign = async () => {
    setLoading(true);
    try {
      if (!User.id) {
        throw new Error("user not login");
      }
      const [authRequest] = await auth();

      const res = await actor.sign_insert(authRequest, 1, messageSHA256, "");
      console.log(User.id, challengeData, messageSHA256, "sign result", res);

      if ((res as any)["Ok"]?.signature) {
        // callback
        console.log((res as any)["Ok"]);
        const challengeRes = await sendChallenge({
          challengeId: challengeID,
          validId: User.id,
          signature: (res as any)["Ok"]?.signature,
        });

        if (challengeRes.data) {
          setChallengeSuccess(true);
        } else {
          toast &&
            toast({ type: "error", message: "Verify fail, please try again" });
        }
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
      {!initLoading ? (
        challengeData ? (
          <div className="rounded-lg bg-white shadow-2xl w-[60%] min-w-[300px] max-w-[640px]">
            <div className="border-b px-8 py-4 font-semibold">
              Valid One Telegram Challenge
            </div>
            <div className="p-8">
              {/* challengeID:{challengeID} */}
              {challengeData.status === 0 && (
                <>
                  <div className="mb-8">
                    Your Telegram friend
                    <kbd className="kbd mx-1">
                      {challengeData.requestUser.name}
                    </kbd>
                    requests verification of your identity.
                  </div>
                  <div className="text-center">
                    {challengeSuccess ? (
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={import.meta.env.VITE_APP_TELEGRAM_BOT_URL}
                          className="btn btn-sm btn-neutral bg-[#000000]"
                        >
                          Back to telegram
                        </a>
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
                        {loading && (
                          <span className="loading loading-spinner"></span>
                        )}
                        Verify
                      </button>
                    )}
                  </div>
                </>
              )}

              {challengeData.status === 1 && <div>Verification completed</div>}

              {challengeData.status === 2 && <div>Verification expired</div>}
            </div>
          </div>
        ) : (
          "Data does not exist"
        )
      ) : (
        "Loading"
      )}
    </div>
  );
});
