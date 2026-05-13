import { loginPage } from '../pages/loginPage';

describe('Login', () => {
    beforeEach(() => {
        cy.fixture('users').as('users');
        cy.visit('/');
    });

    // Testes com credenciais da fixture — evita valores hardcoded para dados sensíveis
    it('TC01 - Should login successfully with valid credentials', function() {
        loginPage.enterUsername(this.users.validUser.username);
        loginPage.enterPassword(this.users.validUser.password);
        loginPage.clickLoginButton();
        cy.url().should('include', '/inventory.html');
    });

    it('TC02 - Should display error for invalid credentials', function() {
        loginPage.enterUsername(this.users.invalidUser.username);
        loginPage.enterPassword(this.users.invalidUser.password);
        loginPage.clickLoginButton();
        loginPage.errorMessage()
            .should('be.visible')
            .and('contain', 'Username and password do not match any user in this service');
    });

    it('TC03 - Should display error when username is missing', () => {
        loginPage.enterPassword('secret_sauce');
        loginPage.clickLoginButton();
        loginPage.errorMessage()
            .should('be.visible')
            .and('contain', 'Username is required');
    });

    it('TC04 - Should display error when password is missing', () => {
        loginPage.enterUsername('standard_user');
        loginPage.clickLoginButton();
        loginPage.errorMessage()
            .should('be.visible')
            .and('contain', 'Password is required');
    });

    it('TC05 - Should display error when both fields are empty', () => {
        loginPage.clickLoginButton();
        loginPage.errorMessage()
            .should('be.visible')
            .and('contain', 'Username is required');
    });

    it('TC06 - Should display error for locked out user', function() {
        loginPage.enterUsername(this.users.lockedUser.username);
        loginPage.enterPassword(this.users.lockedUser.password);
        loginPage.clickLoginButton();
        loginPage.errorMessage()
            .should('be.visible')
            .and('contain', 'Sorry, this user has been locked out.');
    });

    it('TC07 - Should display error for special characters in username', () => {
        loginPage.enterUsername('standard_user!@#$%^&*()');
        loginPage.enterPassword('secret_sauce');
        loginPage.clickLoginButton();
        loginPage.errorMessage()
            .should('be.visible')
            .and('contain', 'Username and password do not match any user in this service');
    });

    it('TC08 - Should display error for special characters in password', () => {
        loginPage.enterUsername('standard_user');
        loginPage.enterPassword('secret_sauce!@#$%^&*()');
        loginPage.clickLoginButton();
        loginPage.errorMessage()
            .should('be.visible')
            .and('contain', 'Username and password do not match any user in this service');
    });
});
