import { logoutPage } from '../pages/logoutPage';

describe('Logout', () => {
    beforeEach(() => {
        cy.login();
    });

    it('TC01 - Should log out successfully', () => {
        logoutPage.logout();
        logoutPage.verifyLoggedOut();
    });

    it('TC02 - Should display login page after logout', () => {
        logoutPage.logout();
        logoutPage.verifyLoginPageVisible();
    });

    it('TC03 - Should clear session data after logout', () => {
        logoutPage.logout();
        logoutPage.verifySessionCleared();
    });

    it('TC04 - Should not allow access to inventory after logout', () => {
        logoutPage.logout();
        logoutPage.verifyCannotAccessInventory();
    });

    it('TC05 - Should not allow access to cart after logout', () => {
        logoutPage.logout();
        logoutPage.verifyCannotAccessCart();
    });

    it('TC06 - Should not allow access to checkout after logout', () => {
        logoutPage.logout();
        logoutPage.verifyCannotAccessCheckout();
    });

    it('TC07 - Should allow logging in again after logout', () => {
        logoutPage.logout();
        logoutPage.verifyCanLoginAgain();
    });

    it('TC08 - Should not expose user data on protected pages after logout', () => {
        logoutPage.logout();
        cy.visit('/inventory.html', { failOnStatusCode: false });
        cy.get('.inventory_item').should('not.exist');
    });
});
