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
import { LoginProviders, GoogleLoginProvider } from "angular4-social-login/entities";

let loginProviders = new LoginProviders();
loginProviders.addProvider(GoogleLoginProvider.PROVIDER_ID, new GoogleLoginProvider("OAuth-Client-Id"));

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
import { AuthService } from "../../../lib";
import { SocialUser, GoogleLoginProvider } from "../../../lib/entities";

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

  signOut(): void {
    this.authService.signOut();
  }

}
```

### Subscribe to the authentication state

```javascript
import { AuthService } from "../../../lib";
import { SocialUser, GoogleLoginProvider } from "../../../lib/entities";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  private user: SocialUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

}
```
