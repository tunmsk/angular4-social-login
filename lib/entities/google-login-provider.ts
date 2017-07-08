import { LoginProvider } from "./login-provider";
import { SocialUser } from "./user";

declare let gapi: any;

export class GoogleLoginProvider implements LoginProvider {

  public static readonly PROVIDER_ID: string = "GOOGLE";

  private auth2: any;

  constructor(private clientId: string) { }

  getName(): string {
    return GoogleLoginProvider.PROVIDER_ID;
  }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      let signInJS = document.createElement("script");
      signInJS.async = true;
      signInJS.src = "//apis.google.com/js/platform.js";
      signInJS.onload = () => {
        gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
            client_id: this.clientId,
            scope: 'email'
          });

          this.auth2.then(() => {
            if (this.auth2.isSignedIn.get()) {
              let user: SocialUser = new SocialUser();
              let profile = this.auth2.currentUser.get().getBasicProfile();

              user.id = profile.getId();
              user.name = profile.getName();
              user.email = profile.getEmail();
              user.photoUrl = profile.getImageUrl();

              resolve(user);
            } else {
              reject("Not logged in");
            }
          });
        });
      }
      document.head.appendChild(signInJS);
    });
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      let promise = this.auth2.signIn();

      promise.then(() => {
        let user: SocialUser = new SocialUser();
        let profile = this.auth2.currentUser.get().getBasicProfile();

        user.id = profile.getId();
        user.name = profile.getName();
        user.email = profile.getEmail();
        user.photoUrl = profile.getImageUrl();
console.log(user);

        resolve(user);
      });

      // promise.catch((err) => reject(err));
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth2.signOut().then(() => {
        resolve();
      });
    });
  }

}
