import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../../sociallogin";
import { SocialUser, GoogleLoginProvider } from "../../../sociallogin/entities";

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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
