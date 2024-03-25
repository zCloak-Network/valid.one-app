import { USER_VALID_ID } from "@/constants";
import { getProfileById } from "@/hooks";
import { UserProfile } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";

export default class User {
  id: number | null;
  profile: UserProfile | null;

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
        this.profile = result;
        console.log("update profile", this.id, result);
      });
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
}
