import { default as useStore, observer } from "@/store";
import SetProfile from "./SetProfile";

export default observer(function Id() {
  const { User } = useStore();
  console.log("[ User.profile ] >", User.profile);
  const isSetProfile = !!User.profile || true;
  console.log("[ isSetProfile ] >", isSetProfile);
  return <>{isSetProfile ? <></> : <SetProfile />}</>;
});
