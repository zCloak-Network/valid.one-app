import { makeAutoObservable } from 'mobx';

export default class User {
  name: string;

  constructor() {
    this.name = '张三';
    makeAutoObservable(this);
  }

  get firstName() {
    return this.name.slice(0, 1);
  }

  changeName() {
    this.name = `李${Math.floor(Math.random() * 10)}`;
  }
}
