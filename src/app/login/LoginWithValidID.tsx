import { default as useStore, observer, autorun } from "@/store";
import { useState, useMemo } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { FaArrowRight } from "react-icons/fa";

export default observer(function LoginWithValidID() {
  const { User } = useStore();
  const [inputValidID, setInputValidID] = useState<number | undefined>();

  autorun(() => {
    if (User.id && !inputValidID) {
      setInputValidID(User.id);
    }
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value.trim();

    const ValidID = isNaN(Number(id)) ? undefined : Number(id);
    console.log(ValidID);
    setInputValidID(ValidID);
  };

  const ValidIDIsReady = useMemo(() => {
    return String(inputValidID).length === 7;
  }, [inputValidID]);

  const handleLogin = () => {
    if (ValidIDIsReady) {
      // TODO
      console.log("Login with Valid ID");
    }
  };

  return (
    <>
      <label
        className={
          "flex w-full gap-2 input input-bordered items-center" +
          (ValidIDIsReady ? "" : " input-warning")
        }
      >
        <input
          type="text"
          className="font-semibold text-lg grow"
          placeholder="Login with Valid ID"
          value={inputValidID}
          onChange={handleInputChange}
        />
        <span
          className="cursor-pointer flex h-8 -mr-4 opacity-70 px-4 items-center justify-center hover:opacity-100"
          onClick={handleLogin}
        >
          <FaArrowRight className="h-5 w-5" />
        </span>
      </label>
    </>
  );
});
