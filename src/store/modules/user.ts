import { USER_VALID_ID } from "@/constants";
import { actor } from "@/utils/canister";
import { UserProfile } from "@/utils/canister/idl/valid_one_backend.did";
import { makeAutoObservable, runInAction } from "mobx";

export type UserData = Omit<UserProfile, "create_time" | "modify_time"> & {
  create_time: number;
  modify_time: number;
};

export default class User {
  id: number | null;
  profile: UserData | null;

  constructor() {
    this.id = null;
    this.profile = null;

    makeAutoObservable(this);

    this.initUser();
  }

  async initUser() {
    this.getUserId();

    if (this.id) {
      await this.getProfile();
    }
  }

  async getProfile() {
    if (!this.id) {
      this.profile = null;
      return;
    }

    const result = await actor.user_profile_get(this.id);
    runInAction(() => {
      if (result[0]) {
        let data: UserData = {
          ...result[0],
          create_time: Number(result[0].create_time),
          modify_time: Number(result[0].modify_time),
        };

        this.profile = data;
        console.log("update profile", this.id, data);
      } else {
        this.profile = null;
      }
    });
  }

  private getUserId() {
    const result = localStorage.getItem(USER_VALID_ID);

    this.id = result ? (JSON.parse(result) as number) : null;
  }

  private saveUser(userId: number) {
    localStorage.setItem(USER_VALID_ID, JSON.stringify(userId));
  }

  setUser(id: number) {
    this.id = id;
    this.getProfile();
    this.saveUser(id);
  }
}
