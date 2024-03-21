import { default as useStore, observer } from "@/store";

import SetProfile from "./SetProfile";
import Main from "./actions/Main";
import Quick from "./actions/Quick";

export default observer(function Id() {
  const { User } = useStore();

  return (
    <div className="flex-1 px-6 pt-6">
      {User.profile?.name ? (
        <>
          <Main />
          <Quick />
        </>
      ) : (
        <SetProfile />
      )}
    </div>
  );
});
