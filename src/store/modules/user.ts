import { USER_VALID_ID } from "@/constants";
import { actor } from "@/utils/canister";
import { UserProfile } from "@/utils/canister/idl/valid_one_backend.did";
import { makeAutoObservable } from "mobx";

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

    const result = await actor.user_profile_get(this.id);

    this.profile = result[0] || null;
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
