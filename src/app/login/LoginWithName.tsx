import { useState, useMemo } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { useNavigate } from "react-router-dom";
import { actor } from "@/utils/canister";
import { FaArrowRight } from "react-icons/fa";
import { USERNAME_REG } from "@/constants";
import { useToast } from "@/components";
import { useStore } from "@/hooks";

export default (function LoginWithName({ onCancel }: { onCancel: () => void }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setName] = useState("");
  const toast = useToast();
  const { User } = useStore();

  const handleLogin = async () => {
    if (loading) {
      return null;
    }
    if (!username) {
      return null;
    }
    setLoading(true);
    try {
      let response = await actor.start_authentication_name(username);

      const authOptions = JSON.parse(response).publicKey;
      // step 2
      let asseResp;
      try {
        asseResp = await startAuthentication({
          ...authOptions,
        });
      } catch (error) {
        console.log(`start authencation error: `, error);
        setLoading(false);
        return;
      }
      console.log(`finish_authentication_new params: `, asseResp);
      let auth_result = await actor.finish_authentication_name(
        JSON.stringify(asseResp)
      );

      setLoading(false);
      if (auth_result === username) {
        User.login(username);
        navigate("/id");
      } else {
        console.warn("auth_result error:", auth_result);
      }
    } catch (e) {
      setLoading(false);
      toast &&
        toast({
          message: "Please check your username and try again",
          type: "error",
        });
    }
  };

  const nameIsValid = useMemo(() => {
    return USERNAME_REG.test(username);
  }, [username]);

  return (
    <div>
      <label
        className={
          "flex w-full gap-2 input input-bordered items-center" +
          (nameIsValid || !username ? "" : " input-warning")
        }
      >
        <input
          type="text"
          className="font-semibold text-lg grow"
          placeholder="Input your username"
          value={username}
          minLength={3}
          maxLength={20}
          onChange={(e) => setName(e.target.value.trim())}
        />
        <span
          className={
            "flex h-8 -mr-4 opacity-70 px-4 items-center justify-center hover:opacity-100" +
            (nameIsValid ? " cursor-pointer" : " cursor-not-allowed")
          }
          onClick={handleLogin}
        >
          {loading ? (
            <span className="loading loading-spinner "></span>
          ) : (
            <FaArrowRight className="h-5 w-5" />
          )}
        </span>
      </label>

      <div className="mt-4 text-sm text-gray-500">
        Regist Valid One with a username.
        <button className="btn btn-link" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
});
