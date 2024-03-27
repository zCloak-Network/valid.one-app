import { USER_VALID_ID } from "@/constants";
import { getProfileById } from "@/hooks";
import { UserProfile } from "@/types";
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

    const result = await getProfileById(this.id);
    if (result) {
      runInAction(() => {
        let data: UserData = {
          ...result,
          create_time: Number(result.create_time),
          modify_time: Number(result.modify_time),
        };

        this.profile = data;
        console.log("update profile", this.id, result);
      });
    } else {
      console.warn("get user profile fail", result);
    }
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

  clearUser() {
    this.id = null;
    this.profile = null;
    localStorage.removeItem(USER_VALID_ID);
  }
}
