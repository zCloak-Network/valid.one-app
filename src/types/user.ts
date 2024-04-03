import type { UserProfile } from "@/utils/canister/valid_one_backend/valid_one_backend.did";

export type UserProfileData = Omit<
  UserProfile,
  "create_time" | "modify_time"
> & {
  create_time: number;
  modify_time: number;
};
