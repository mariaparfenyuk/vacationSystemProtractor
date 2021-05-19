describe('Protractor Demo App', function() {

  browser.waitForAngularEnabled(false);

  // var firstNumber = element(by.model('first'));
  // var secondNumber = element(by.model('second'));
  // var goButton = element(by.id('gobutton'));
  // var latestResult = element(by.binding('latest'));

  // function add(a, b) {
  //   firstNumber.sendKeys(a);
  //   secondNumber.sendKeys(b);
  //   goButton.click();
  // }

  beforeEach(function() {  
    browser.get('https://test.webtech.by/vac-system/')
  });

  it('Get page title and check elements', function() {
    expect(browser.getTitle()).toEqual('Vacation System')
    expect(browser.driver.findElement(by.css('span.mdl-layout-title')).isDisplayed())
    expect(element(by.css('span.mdl-layout-title')).getText()).toBe('Vacations')
    expect(browser.driver.findElement(by.css('#add-new-vac')).isDisplayed())
    expect(browser.driver.findElement(by.css('#vacation-list')).isDisplayed())
  });

  it('Click Add vacation and check pop-up elements', function() {
    const EC = protractor.ExpectedConditions
    browser.driver.findElement(by.css('span.mdl-layout-title')).isDisplayed()
    browser.driver.findElement(by.css('#add-new-vac')).click()
    browser.wait(EC.visibilityOf(element(by.css('h4.mdl-dialog__title'))), 10000)
    expect(browser.driver.findElement(by.css('h4.mdl-dialog__title')).isDisplayed())
    expect((element(by.css('h4.mdl-dialog__title')).getText())).toBe('Add new vacation?')
    expect(browser.driver.findElement(by.css('span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center')).isDisplayed())
    expect((element(by.css('span.mdl-checkbox__label')).getText())).toBe('No objections from my manager')
    expect(browser.driver.findElement(by.css('input#from.mdl-textfield__input')).isDisplayed())
    expect(browser.driver.findElement(by.css('input#to.mdl-textfield__input')).isDisplayed())
    expect((element(by.css('#cancel')).getText())).toBe('CANCEL')
    expect((element(by.css('#save')).getText())).toBe('SAVE')
  });
});