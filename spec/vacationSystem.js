var vacationUrl = 'https://test.webtech.by/vac-system/'

var dateFrom = '11-12-2021'
var dateTo = '15-12-2021'

var mainPageElements = {
  title: element(by.css('span.mdl-layout-title')),
  addVacationButton: element(by.css('#add-new-vac')),
  tableWithVacation: element(by.css('#vacation-list')),
  closeVacTogle: element(by.css('span.mdl-switch__ripple-container.mdl-js-ripple-effect.mdl-ripple--center')),
  status: element(by.css('#vacation-list > tbody > tr > td:nth-child(5)')),
}

var popupElements = {
  title: element(by.css('h4.mdl-dialog__title')),
  checkBox: element(by.css('span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center')),
  checkBoxTitle: element(by.css('span.mdl-checkbox__label')),
  inputFrom: element(by.css('input#from.mdl-textfield__input')),
  inputTo: element(by.css('input#to.mdl-textfield__input')),
  cancelButton: element(by.css('#cancel')),
  saveButton: element(by.css('#save')),
  errorMessage: element(by.css('#errorMessage'))
}

describe('Protractor Demo test scenarios', function() {

  browser.waitForAngularEnabled(false);
  const EC = protractor.ExpectedConditions

  beforeEach(function() {  
    browser.get(vacationUrl)
  });

  it('Get page title and check elements', function() {
    expect(browser.getTitle()).toEqual('Vacation System')
    expect(browser.driver.findElement(by.css('span.mdl-layout-title')).isDisplayed())
    expect(mainPageElements.title.getText()).toBe('Vacations')
    expect(mainPageElements.addVacationButton.isDisplayed())
    expect(mainPageElements.tableWithVacation.isDisplayed())
  });

  it('Click Add vacation and check pop-up elements', function() {
    expect(mainPageElements.title.isDisplayed())
    mainPageElements.addVacationButton.click()
    browser.wait(EC.visibilityOf(popupElements.title), 1000)
    expect(popupElements.title.getText()).toBe('Add new vacation?')
    expect(popupElements.checkBox.isDisplayed())
    expect(popupElements.checkBoxTitle.getText()).toBe('No objections from my manager')
    expect(popupElements.inputFrom.isDisplayed())
    expect(popupElements.inputTo.isDisplayed())
    expect(popupElements.cancelButton.getText()).toBe('CANCEL')
    expect(popupElements.saveButton.getText()).toBe('SAVE')
  });

  it('Add valid vacation and close it', function() {
    expect(mainPageElements.title.isDisplayed())
    mainPageElements.addVacationButton.click()
    browser.wait(EC.visibilityOf(popupElements.title), 1000)
    popupElements.checkBox.click()
    popupElements.inputFrom.clear()
    popupElements.inputFrom.sendKeys(dateFrom)
    popupElements.inputTo.clear()
    popupElements.inputTo.sendKeys(dateTo)
    popupElements.saveButton.click()
    browser.wait(EC.visibilityOf(mainPageElements.closeVacTogle), 1000)
    mainPageElements.closeVacTogle.click()
    expect(mainPageElements.status.getText()).toBe('closed')
  });
});

describe('Protractor Demo negative test scenarios', function() {

  browser.waitForAngularEnabled(false)
  const EC = protractor.ExpectedConditions

  beforeEach(function() {  
    browser.driver.manage().deleteAllCookies()
    browser.get(vacationUrl)
  });

  it('Add vacation without selected checkbox', function() {
    expect(mainPageElements.title.isDisplayed())
    mainPageElements.addVacationButton.click()
    browser.wait(EC.visibilityOf(popupElements.title), 1000)
    popupElements.inputFrom.clear()
    popupElements.inputFrom.sendKeys(dateFrom)
    popupElements.inputTo.clear()
    popupElements.inputTo.sendKeys(dateTo)
    popupElements.saveButton.click()
    browser.wait(EC.visibilityOf(popupElements.title), 1000)
    browser.wait(EC.visibilityOf(popupElements.errorMessage), 10000)
    expect(popupElements.errorMessage.getText()).toBe('There should be no objections from your manager.')
  });

  it('Add vacation without info', function() {
    expect(mainPageElements.title.isDisplayed())
    mainPageElements.addVacationButton.click()
    browser.wait(EC.visibilityOf(popupElements.title), 1000)
    popupElements.saveButton.click()
    browser.wait(EC.visibilityOf(popupElements.errorMessage), 10000)
    expect(popupElements.errorMessage.getText()).toBe('"To" field is required.')
  });

  it('Add vacation without To date', function() {
    expect(mainPageElements.title.isDisplayed())
    mainPageElements.addVacationButton.click()
    browser.wait(EC.visibilityOf(popupElements.title), 1000)
    popupElements.inputFrom.clear()
    popupElements.inputFrom.sendKeys(dateFrom)
    popupElements.saveButton.click()
    browser.wait(EC.visibilityOf(popupElements.errorMessage), 10000)
    expect(popupElements.errorMessage.getText()).toBe('"To" field is required.')
  });

  it('Add vacation without From date', function() {
    expect(mainPageElements.title.isDisplayed())
    mainPageElements.addVacationButton.click()
    browser.wait(EC.visibilityOf(popupElements.title), 1000)
    popupElements.inputTo.clear()
    popupElements.inputTo.sendKeys(dateTo)
    popupElements.saveButton.click()
    browser.wait(EC.visibilityOf(popupElements.errorMessage), 1000)
    expect(popupElements.errorMessage.getText()).toBe('"From" is required.')
  });

  it('Add vacation with date To < date From', function() {
    expect(mainPageElements.title.isDisplayed())
    mainPageElements.addVacationButton.click()
    browser.wait(EC.visibilityOf(popupElements.title), 1000)
    popupElements.checkBox.click()
    popupElements.inputFrom.clear()
    popupElements.inputFrom.sendKeys(dateTo)
    popupElements.inputTo.clear()
    popupElements.inputTo.sendKeys(dateFrom)
    popupElements.saveButton.click()
    browser.wait(EC.visibilityOf(popupElements.errorMessage), 1000)
    expect(popupElements.errorMessage.getText()).toBe('You are unable to set To date before From.')
  });
});  