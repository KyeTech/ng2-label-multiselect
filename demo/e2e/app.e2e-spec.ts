import { Ng2LabelMultiselectDemoPage } from './app.po';

describe('ng2-label-multiselect-demo App', function() {
  let page: Ng2LabelMultiselectDemoPage;

  beforeEach(() => {
    page = new Ng2LabelMultiselectDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
