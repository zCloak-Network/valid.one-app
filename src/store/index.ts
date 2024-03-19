import { observer } from "mobx-react-lite";

import User from "./modules/user";

class Store {
  User: User;

  constructor() {
    this.User = new User();
  }
}

export interface StoreData {
  User: User;
}

let store: StoreData | null = null;

export default function initializeStore() {
  if (store === null) {
    store = new Store();
  }
  return store;
}

export { observer };
