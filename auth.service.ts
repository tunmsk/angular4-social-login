import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { LoginProviders } from "./entities/login-providers";
import { LoginProvider } from "./entities/login-provider";
import { SocialUser } from "./entities/user";

@Injectable()
export class AuthService {

  private static readonly LOGIN_PROVIDER_NOT_FOUND: string = "Login provider not found";

  private providers: Map<string, LoginProvider>;

  private _user: SocialUser = null;
  private _authState: BehaviorSubject<SocialUser> = new BehaviorSubject(null);

  get authState(): Observable<SocialUser> {
    return this._authState.asObservable();
  }

  constructor(providers: LoginProviders) {
    this.providers = providers.get();

    this.providers.forEach((provider: LoginProvider, key: string) => {
      provider.initialize().then((user: SocialUser) => {
        user.provider = key;

        this._user = user;
        this._authState.next(user);
      }).catch((err) => {
        this._authState.next(null);
      });
    });
  }

  signIn(providerId: string): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      let providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.signIn().then((user: SocialUser) => {
          user.provider = providerId;
          resolve(user);

          this._user = user;
          this._authState.next(user);
        });
      } else {
        reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      let providerId = this._user.provider;
      let providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.signIn().then(() => {
          resolve();

          this._user = null;
          this._authState.next(null);
        });
      } else {
        reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

}
