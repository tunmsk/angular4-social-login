import { Angular4SocialLoginPage } from './app.po';

describe('angular4-social-login App', () => {
  let page: Angular4SocialLoginPage;

  beforeEach(() => {
    page = new Angular4SocialLoginPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
