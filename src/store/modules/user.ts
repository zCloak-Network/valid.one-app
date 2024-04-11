import { USER_STORAGE_KEY, USER_HISTORY_KEY } from "@/constants";
import { getProfileByName } from "@/hooks";
import { UserProfileData } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";

export type UserData = Omit<UserProfileData, "create_time" | "modify_time"> & {
  create_time: number;
  modify_time: number;
};

export default class User {
  id: number | null;
  name: string | null;
  profile: UserData | null;

  constructor() {
    this.id = null;
    this.name = null;
    this.profile = null;

    makeAutoObservable(this);

    this.initUser();
  }

  async initUser() {
    const localKey = localStorage.getItem(USER_STORAGE_KEY);
    this.name = localKey || null;

    if (this.name) {
      await this.getProfile();
    }
  }

  async getProfile() {
    if (!this.name) {
      this.id = null;
      this.profile = null;

      return;
    }

    const result = await getProfileByName(this.name);
    if (result) {
      runInAction(() => {
        let data: UserData = {
          ...result,
          create_time: Number(result.create_time),
          modify_time: Number(result.modify_time),
        };

        this.id = data.id;
        this.profile = data;

        console.log("update profile", this.id, result);
      });
    } else {
      console.warn("get user profile fail", result);
      this.logout();
    }
  }

  private saveCurrentUser(userName: string) {
    localStorage.setItem(USER_STORAGE_KEY, userName);
    localStorage.setItem(USER_HISTORY_KEY, userName);
  }

  logout() {
    this.id = null;
    this.profile = null;
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  async login(name: string) {
    this.name = name;
    this.saveCurrentUser(name);
    await this.getProfile();
  }
}
