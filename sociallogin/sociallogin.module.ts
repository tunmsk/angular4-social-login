import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginProviders } from "./entities/login-providers";
import { AuthService } from "./auth.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService
  ]
})
export class SocialLoginModule {

  constructor() {}

  static initialize(config: LoginProviders): any {
    let loginModule = {
      ngModule: SocialLoginModule,
      providers: [
        AuthService,
        { provide: LoginProviders, useValue: config }
      ]
    };

    return loginModule;
  }

}
