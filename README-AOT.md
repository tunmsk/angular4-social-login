If you are facing the following compilation error while building your app with AoT on, try the workaround discussed below - 

> ERROR in Error encountered resolving symbol values statically. Calling function 'AuthServiceConfig', function calls are not supported. Consider replacing the function or lambda with a reference to an exported function, resolving symbol config in ../src/app/app.module.ts, resolving symbol AppModule in ../src/app/app.module.ts, resolving symbol AppModule in ../src/app/app.module.ts

Change your `AppModule` class in the following way - 

```javascript
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("561602290896109")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [...]
})
export class AppModule { }
```
