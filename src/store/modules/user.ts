import { axiosRouter } from "@/utils/axiosRouter";
import { makeAutoObservable } from "mobx";

export default class User {
  id: string | null;
  profile: Record<string, any> | null;

  constructor() {
    this.id = null;
    this.profile = null;

    makeAutoObservable(this);

    this.initUser();
  }

  async initUser() {
    await this.getUserId();

    if (this.id) {
      await this.getProfile();
    }
  }

  async getProfile() {
    if (!this.id) {
      this.profile = null;
      return;
    }

    const result = await axiosRouter.get<Record<string, any> | null>(
      `/api/exampleGET?id=${this.id}`,
    );

    this.profile = result.data;
  }

  async getUserId() {
    const result = await axiosRouter.get<{ userId: string }>("/api/userId");

    this.id = result.data.userId;
  }

  setUser(id: string) {
    this.id = id;
    this.getProfile();
  }
}
