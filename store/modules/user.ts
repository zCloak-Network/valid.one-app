import { makeAutoObservable } from "mobx";
import { localPasskey } from "@/utils";

export default class User {
  id: string | null;
  profile: Record<string, any> | undefined;

  constructor() {
    this.id = localPasskey();

    if (this.id) {
      this.getProfile();
    }

    makeAutoObservable(this);
  }

  async getProfile() {
    if (!this.id) {
      this.profile = undefined;
    }

    const user = await fetch(`/api/exampleGET?id=${this.id}`);
    this.profile = await user.json();
  }

  setUser(id: string) {
    this.id = id;
    this.getProfile();
  }
}
