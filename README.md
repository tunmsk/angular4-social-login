# Angular4 Social Login

Social login and authentication module for Angular 4. Supports authentication with **Google** and **Facebook**. Can be extended to other providers also.

## Getting started

### Install via npm 

```sh
npm install --save angular4-social-login
```

### Import the module

In your `AppModule`, import the `SocialLoginModule`

```javascript
import { SocialLoginModule } from "angular4-social-login";
import { LoginProviders, GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login/entities";

let loginProviders = new LoginProviders();
loginProviders.addProvider(GoogleLoginProvider.PROVIDER_ID, new GoogleLoginProvider("OAuth-Client-Id"));
loginProviders.addProvider(FacebookLoginProvider.PROVIDER_ID, new FacebookLoginProvider("FB-App-Id"));

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    SocialLoginModule.initialize(loginProviders)
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
```

### Sign in and out users

```javascript
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login/entities";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private authService: AuthService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
```

### Subscribe to the authentication state

You are notified when user logs in or logs out. You receive a `SocialUser` object when the user logs in and a `null` when the user logs out. `SocialUser` object contains basic user information such as name, email, photo URL, etc.

```javascript
import { AuthService } from "angular4-social-login";
import { SocialUser } from "angular4-social-login/entities";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
```

### Display the user information

```html
<img src="{{ user.photoUrl }}">
<div>
  <h4>{{ user.name }}</h4>
  <p>{{ user.email }}</p>
</div>
```
