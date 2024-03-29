import { USERS_LIST, USER_VALID_ID } from "@/constants";
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
  users: number[];

  constructor() {
    this.id = null;
    this.profile = null;
    this.users = [];

    makeAutoObservable(this);

    this.initUser();
  }

  async initUser() {
    this.loadUsers();
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

  private loadUsers() {
    const users = localStorage.getItem(USERS_LIST);
    this.users = users ? JSON.parse(users) : [];
  }

  private saveUserList() {
    localStorage.setItem(USERS_LIST, JSON.stringify(this.users));
  }

  async switchUser(id: number) {
    if (this.users.includes(id)) {
      this.id = id;
      await this.getProfile();
    }
  }

  private saveCurrentUser(userId: number) {
    localStorage.setItem(USER_VALID_ID, JSON.stringify(userId));
  }

  logout() {
    this.id = null;
    this.profile = null;
    localStorage.removeItem(USER_VALID_ID);
  }

  async login(id: number) {
    if (!this.users.includes(id)) {
      this.users.push(id);
      this.saveUserList();
    }
    this.id = id;
    this.saveCurrentUser(id);
    await this.getProfile();
  }
}
