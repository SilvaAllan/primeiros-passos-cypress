import userData from '../fixtures/user-data.json'

describe('teOrange HRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    selectionTitleTopBar: '.oxd-topbar-header-breadcrumb-module',
    dashboardGrid: ".orangehrm-dashboard-grid",
    wrongCredentialAlert: "[role='alert']",
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: "[name='firstName']",
    middleNameField: "[name='middleName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='dd-mm-yyyy']",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",
    genericComboBox: ".oxd-select-text--arrow",
    secondItemComboBox: '.oxd-select-dropdown > :nth-child(2)',
    ThirdtemComboBox: '.oxd-select-dropdown > :nth-child(3)'
    
     
     
  }
  
  it.only('User info Update - Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorsList.middleNameField).clear().type('MiddleNameTest')
    cy.get(selectorsList.lastNameField).clear().type('LastNameTest')
    cy.get(selectorsList.genericField).eq(3).clear().type('Employee')
    cy.get(selectorsList.genericField).eq(4).clear().type('OtherIdTest')
    cy.get(selectorsList.genericField).eq(5).clear().type('DriversLicenseTest')
    cy.get(selectorsList.genericField).eq(6).clear().type('2026-02-10')
    cy.get(selectorsList.dateCloseButton).click()
    
    cy.intercept('PUT', '**/personal-details').as('saveUser')
    cy.get(selectorsList.submitButton).eq(0).click({force: true})
    cy.get('body').should('contain', 'Successfully Updated')
    cy.get('.oxd-toast') 
    /*cy.get(selectorsList.submitButton).eq(0).click({ force: true })
    cy.wait('@saveUser')
    cy.get('.oxd-toast').should('exist').and('contain', 'Successfully Updated')*/

    cy.get(selectorsList.genericComboBox).eq(0).click({force: true})
    cy.get(selectorsList.secondItemComboBox).click()
    cy.get(selectorsList.genericComboBox).eq(1).click({force: true})
    cy.get(selectorsList.ThirdtemComboBox).click()



    /*cy.get(selectorsList.genericComboBox).eq(0).click()
    cy.contains('Bosnian').click()
    cy.get(selectorsList.genericComboBox).eq(1).click()
    cy.contains('Married').click()*/



    
    
  })

  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
})