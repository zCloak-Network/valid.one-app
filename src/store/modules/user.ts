import { USER_VALID_ID } from "@/constants";
import { axiosRouter } from "@/utils/axiosRouter";
import { makeAutoObservable } from "mobx";

export default class User {
  id: number | null;
  profile: Record<string, any> | null;

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

    const result = await axiosRouter.get<Record<string, any> | null>(`/api/exampleGET?id=${this.id}`);

    this.profile = result.data;
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
