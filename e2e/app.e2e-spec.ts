import { IEEElectivePickerPage } from './app.po';

describe('iee-review-elective-picker App', () => {
  let page: IEEElectivePickerPage;

  beforeEach(() => {
    page = new IEEElectivePickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
