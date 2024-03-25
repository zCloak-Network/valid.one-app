import { actor } from "@/utils/canister";
export async function getProfileById(id: number) {
  return (await actor.user_profile_get(id))[0] || null;
}

export async function getProfileByPublicKey(publicKey: string) {
  // return (await actor.user_profile_get_by_pub_key(publicKey))[0] || null;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        public_key: publicKey,
        name: "test",
        avatar: "https://avatars.githubusercontent.com/u/10277002?v=4",
        bio: "test",
        create_time: 0n,
        modify_time: 0n,
      });
    }, 0);
  });
}
