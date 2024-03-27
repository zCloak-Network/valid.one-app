import { actor } from "@/utils/canister";
export async function getProfileById(id: number) {
  return (await actor.user_profile_get(id))[0] || null;
}

export async function getProfileByPublicKey(publicKey: string) {
  return (await actor.user_profile_get_by_pub_key(publicKey))[0] || null;
}

export async function getRecordByUUID(uuid: string) {
  return (await actor.sign_get_by_uuid(uuid))[0] || null;
}

export async function getRecordBySignature(signature: string) {
  return (await actor.sign_get_by_signature(signature))[0] || null;
}
