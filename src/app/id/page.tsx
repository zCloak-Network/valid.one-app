import { default as useStore, observer } from "@/store";
import SetProfile from "./SetProfile";

export default observer(function Id() {
  const { User } = useStore();
  console.log("[ User.profile ] >", User.profile);
  const isSetProfile = !!User.profile;
  console.log("[ isSetProfile ] >", isSetProfile);
  return (
    <div className="flex-1">
      {isSetProfile ? <>{User.id} isSetProfile</> : <SetProfile />}
    </div>
  );
});
