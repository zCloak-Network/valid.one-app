import IconBack from "@/assets/svg/icon/icon_back.svg?react";
import UploadAvatar from "./UploadAvatar";
import { useCallback, useState } from "react";
import LoadingButton from "@/components/LoadingButton";
import { usePasskeyAuth } from "@/hooks";
import { actor } from "@/utils/canister";
import { useToggle } from "react-use";
const maxLength = 200;

const EditProfile = () => {
  const [avatarFile, setAvatarFile] = useState<File>();
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const { auth } = usePasskeyAuth();
  const [loading, toggle] = useToggle(false);

  const handelSave = useCallback(async () => {
    if (!avatarFile) return console.warn("avatar is required");
    try {
      console.log("[ avatarFile ] >", avatarFile);
      console.log("[ name ] >", name);
      console.log("[ bio ] >", bio);
      toggle();
      const authRequest = await auth();
      console.log("[ authRequest ] >", authRequest);
      // TODO fix s3 upload
      // const formData = new FormData();
      // formData.append("file", avatarFile, avatarFile.name);
      // const avatarResult = await axiosCardService.post("/api/s3/upload", formData);
      const data = await actor.user_profile_edit(
        authRequest,
        "https://zcloak.s3.us-east-2.amazonaws.com/dev/1691735099606_jpTx8UnhPm.png",
        name,
        bio
      );
      console.log("[ data ] >", data);
      toggle();
    } catch (error) {
      console.log(error);
    }
  }, [auth, avatarFile, name, bio, toggle]);

  const handleChange = (event: any) => {
    setBio(event.target.value);
  };
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  return (
    <div className="px-5 flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center py-4 relative">
        <button className="absolute rounded-lg border border-zinc-300 p-2">
          <IconBack />
        </button>
        <p className="text-gray-800 text-lg font-bold mx-auto">Edit Profile</p>
      </div>
      <div className="flex-1 overflow-auto">
        <p className="w-full text-neutral-400 text-sm font-medium mt-5">
          Here, you'll merge different elements of your digital identity to
          create a complete online profile. Note that we'll verify the details
          you provide
        </p>

        <div className="flex w-full justify-center mt-8">
          <UploadAvatar onChange={setAvatarFile} />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="name">Name</label>
          <input
            id="name"
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

export default EditProfile;
