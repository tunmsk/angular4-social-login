import { LoginProvider } from "./login-provider";

/*
 * TODO LoginProviders is supposed to be like
 * class LoginProviders extends Map<string, LoginProvider>,
 * but there are some problems with browser implementations of Map
 */

export class LoginProviders {

  private providers: Map<string, LoginProvider> = new Map<string, LoginProvider>();

  constructor() {}

  addProvider(id: string, provider: LoginProvider) {
    this.providers.set(id, provider);
  }

  removeProvider(id: string) {
    this.providers.delete(id);
  }

  get(): Map<string, LoginProvider> {
    return this.providers;
  }

}
