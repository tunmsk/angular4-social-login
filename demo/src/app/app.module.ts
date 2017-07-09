import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DemoComponent } from './demo/demo.component';

import { SocialLoginModule, AuthService } from "../../..";
import { LoginProviders, GoogleLoginProvider, FacebookLoginProvider } from '../../../entities';

let loginProviders = new LoginProviders();
loginProviders.addProvider(GoogleLoginProvider.PROVIDER_ID, new GoogleLoginProvider("624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com"));
loginProviders.addProvider(FacebookLoginProvider.PROVIDER_ID, new FacebookLoginProvider("561602290896109"));

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SocialLoginModule.initialize(loginProviders)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
