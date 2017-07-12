import { ForeignWorkforceManagementAppPage } from './app.po';

describe('foreign-workforce-management-app App', () => {
  let page: ForeignWorkforceManagementAppPage;

  beforeEach(() => {
    page = new ForeignWorkforceManagementAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
