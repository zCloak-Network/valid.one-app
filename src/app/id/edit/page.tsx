import IconBack from "@/assets/svg/icon/icon_back.svg?react";
import UploadAvatar from "./UploadAvatar";
import { useCallback, useEffect, useState } from "react";
import LoadingButton from "@/components/LoadingButton";
import { usePasskeyAuth, useStore } from "@/hooks";
import { actor } from "@/utils/canister";
import { observer } from "@/store";
import { useToggle } from "react-use";
import { axiosCardService } from "@/utils/axiosCardService";
import { Link, useNavigate } from "react-router-dom";
const maxLength = 200;

const EditProfile = () => {
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
    setAvatarUrl(User.profile?.avatar === "" ? undefined : User.profile?.avatar);
  }, [User.profile]);
  const handelSave = useCallback(async () => {
    if (!avatarFile) return console.warn("avatar is required");
    try {
      toggle();
      const authRequest = await auth();
      const formData = new FormData();
      formData.append("file", avatarFile, avatarFile.name);
      const avatarResult = await axiosCardService.post("/api/s3/upload", formData);
      const data = await actor.user_profile_edit(authRequest, avatarResult.data, name, bio);
      await User.getProfile();
      navigate("/id");
      console.log("[ data ] >", data);
      toggle();
    } catch (error) {
      console.log(error);
    }
  }, [auth, avatarFile, name, bio, toggle, navigate]);

  const handleChange = (event: any) => {
    setBio(event.target.value);
  };
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  return (
    <div className="px-5 flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center py-4 relative">
        <Link className="absolute rounded-lg border border-zinc-300 p-2" to={"/id"} replace>
          <IconBack />
        </Link>
        <p className="text-gray-800 text-lg font-bold mx-auto">Edit Profile</p>
      </div>
      <div className="flex-1 overflow-auto">
        <p className="w-full text-neutral-400 text-sm font-medium mt-5">
          Here, you'll merge different elements of your digital identity to create a complete online profile. Note that
          we'll verify the details you provide
        </p>

        <div className="flex w-full justify-center mt-8">
          <UploadAvatar onChange={setAvatarFile} url={avatarUrl} />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            onChange={handleNameChange}
          />
          <div className="relative mt-5">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              className="textarea textarea-bordered w-full h-24"
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
          className="btn h-12 rounded-xl bg-gray-800 text-white w-full p-2 my-8"
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
