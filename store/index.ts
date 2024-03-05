import { enableStaticRendering, observer } from 'mobx-react-lite';

import User from './modules/user';

const isServer = !process.browser;
enableStaticRendering(isServer);

class Store {
  User: User;

  constructor() {
    this.User = new User();
  }
}

interface StoreData {
  User: User;
}

let store: StoreData | null = null;

export default function initializeStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new Store();
  }
  if (store === null) {
    store = new Store();
  }
  return store;
}

export { observer };
