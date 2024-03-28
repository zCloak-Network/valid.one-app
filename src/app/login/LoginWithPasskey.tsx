import { default as useStore, observer } from "@/store";
import { useCallback, useState } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { useNavigate } from "react-router-dom";
import { actor } from "@/utils/canister";
import { useToggle } from "react-use";
import LoadingButton from "@/components/LoadingButton";
import { Drawer } from "@/components";

export default observer(function HomePage() {
  const store = useStore();
  const navigate = useNavigate();
  const [selectUser, setSelectUser] = useState<number>(0);
  const [openUser, toggleUser] = useToggle(false);
  const [loading, toggle] = useToggle(false);

  const handlePasskeyLogin = useCallback(async () => {
    if (!store.User.id) {
      console.log(`User not logged in`);
      return;
    }
    let response = await actor.start_authentication_new(store.User.id);
    const authOptions = JSON.parse(response).publicKey;

    // step 2
    let asseResp;
    try {
      asseResp = await startAuthentication({
        ...authOptions,
      });
    } catch (error) {
      console.log(`start authencation error: `, error);
      return;
    }

    let auth_result = await actor.finish_authentication_new(JSON.stringify(asseResp));

    auth_result === store.User.id && navigate("/id");
  }, [toggleUser, store]);

  const selectLogin = () => {
    store.User.login(selectUser);
    handlePasskeyLogin();
    toggleUser();
  };

  const onLogin = async () => {
    toggle();
    toggleUser();
    setSelectUser(0)
  };

  return (
    <>
      <LoadingButton className="btn btn-primary w-full" onClick={onLogin} loading={loading}>
        Sign up or Log in using Passkey
      </LoadingButton>
      {openUser && (
        <Drawer isOpen={openUser} onClose={onLogin}>
          <div className="bg-white w-full flex flex-col rounded-tl-3xl rounded-tr-3xl h-96 p-6 items-center sm:max-w-[460px] m-auto">
            <div className="rounded-full mx-auto bg-gray-200 h-1 w-14" />
            <span className="font-bold py-2">Select Valid ID to continue</span>
            <div className="h-56 w-full overflow-scroll">
              {store.User.users.map((user) => (
                <div
                  key={user}
                  onClick={() => setSelectUser(user)}
                  className={`${
                    user === selectUser ? "bg-primary text-white" : ""
                  } w-full btn border rounded-xl flex mx-auto bg-neutral-100 border-zinc-200 h-12 my-3 items-center justify-center`}
                >
                  Valid ID: {user}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 w-full p-2">
              <button
                className={`${selectUser === 0 ? "btn-disabled" : ""} rounded-xl btn w-full bg-gray-800 text-white p-2`}
                onClick={selectLogin}
              >
                Login
              </button>
              <button className="rounded-xl w-full btn btn-outline p-2" onClick={onLogin}>
                Cancel
              </button>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
});
