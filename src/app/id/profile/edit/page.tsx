import UploadAvatar from "./UploadAvatar";
import { useCallback, useEffect, useState } from "react";
import LoadingButton from "@/components/LoadingButton";
import { usePasskeyAuth, useStore } from "@/hooks";
import { actor } from "@/utils/canister";
import { observer } from "@/store";
import { useToggle } from "react-use";
import { upload } from "@/api";
import { useNavigate } from "react-router-dom";
import { ChannelHead, useToast } from "@/components";
import { getQueryParams } from "@/utils";

const maxLength = 200;

const EditProfile = () => {
  const toast = useToast();
  const searchParams = getQueryParams("redirect");
  const { User } = useStore();
  const [avatarFile, setAvatarFile] = useState<File>();
  const [bio, setBio] = useState(User.profile?.bio || "");
  const [name, setName] = useState(User.profile?.name || "");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    User.profile?.avatar === "" ? undefined : User.profile?.avatar
  );
  const { auth } = usePasskeyAuth();
  const [loading, toggle] = useToggle(false);
  const navigate = useNavigate();
  useEffect(() => {
    setName(User.profile?.name || "");
    setBio(User.profile?.bio || "");
    setAvatarUrl(
      User.profile?.avatar === "" ? undefined : User.profile?.avatar
    );
  }, [User.profile]);
  const handelSave = useCallback(async () => {
    try {
      toggle();
      const authRequest = await auth().catch(() => {
        toggle();
      });
      let avatarResult = User.profile?.avatar;
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile, avatarFile.name);
        avatarResult = (await upload(formData)).data;
        upload(formData)
          .then((res) => {
            avatarResult = res.data;
          })
          .catch(() => {
            toggle();
            alert("Upload avatar error!");
          });
      }

      if (authRequest) {
        const data = await actor
          .user_profile_edit(authRequest, avatarResult || "", name, bio)
          .catch(() => {
            toggle();
            toast &&
              toast({
                type: "error",
                message: "Edit profile error!",
              });
          });
        await User.getProfile();
        navigate(searchParams || "/id");
        console.log("[ data ] >", data);
        toggle();
      }
    } catch (error) {
      console.log(error);
      toast &&
        toast({
          type: "error",
          message: (error as Error).message || "Edit profile error!",
        });
    }
  }, [auth, avatarFile, name, bio, toggle, navigate]);

  const handleChange = (event: any) => {
    setBio(event.target.value);
  };
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  return (
    <div className="flex flex-col flex-1 px-5 overflow-hidden">
      <ChannelHead path="/id" title="Edit Profile" hideBack={!!searchParams} />

      <div className="flex-1 overflow-auto">
        <p className="font-medium mt-5 text-sm w-full text-neutral-400">
          Here, you'll merge different elements of your digital identity to
          create a complete online profile. Note that we'll verify the details
          you provide
        </p>

        <div className="flex mt-8 w-full justify-center">
          <UploadAvatar
            onChange={setAvatarFile}
            url={avatarUrl}
            onError={(err) => {
              alert("select avatar error:" + err.message);
            }}
          />
        </div>
        <div className="flex flex-col mt-8 gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            type="text"
            placeholder="Type here"
            className="w-full input input-bordered"
            onChange={handleNameChange}
          />
          <div className="mt-5 relative">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              className="h-24 w-full textarea textarea-bordered"
              placeholder="Please enter a bio about yourself"
              value={bio}
              onChange={handleChange}
              maxLength={maxLength}
            ></textarea>
            <div
              className={`absolute bottom-0 right-0 p-2 text-xs  ${
                bio.length === maxLength ? "text-red-500" : "text-gray-600"
              }`}
            >
              {bio.length}/{maxLength}
            </div>
          </div>
        </div>
        <LoadingButton
          className="rounded-xl bg-gray-800 h-12 my-8 text-white w-full p-2 btn"
          loading={loading}
          onClick={handelSave}
        >
          Save
        </LoadingButton>
      </div>
    </div>
  );
};

export default observer(EditProfile);
