import { productsPage } from '../pages/productsPage';
import { cartPage } from '../pages/cartPage';
import { checkoutPage } from '../pages/checkoutPage';
import { logoutPage } from '../pages/logoutPage';

describe('Checkout', () => {
    beforeEach(() => {
        cy.fixture('checkout').as('checkoutInfo');
        cy.login();
    });

    it('TC01 - Should complete checkout successfully with a single item', function() {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        checkoutPage.fillCheckoutForm(
            this.checkoutInfo.validInfo.firstName,
            this.checkoutInfo.validInfo.lastName,
            this.checkoutInfo.validInfo.postalCode
        );
        checkoutPage.clickContinue();
        checkoutPage.verifyStepTwoUrl();
        checkoutPage.clickFinish();
        checkoutPage.verifyOrderComplete();
        checkoutPage.verifyCompleteUrl();
    });

    it('TC02 - Should display error when first name is missing', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        checkoutPage.clickContinue();
        checkoutPage.verifyMissingFirstNameError();
        checkoutPage.verifyStepOneUrl();
    });

    it('TC03 - Should display error when last name is missing', function() {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        // Preenche apenas primeiro nome e código postal — apelido fica vazio para testar validação
        checkoutPage.fillCheckoutForm(this.checkoutInfo.validInfo.firstName, '', this.checkoutInfo.validInfo.postalCode);
        checkoutPage.clickContinue();
        checkoutPage.verifyMissingLastNameError();
        checkoutPage.verifyStepOneUrl();
    });

    it('TC04 - Should display error when postal code is missing', function() {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        // Preenche apenas nome e apelido — código postal fica vazio para testar validação
        checkoutPage.fillCheckoutForm(this.checkoutInfo.validInfo.firstName, this.checkoutInfo.validInfo.lastName, '');
        checkoutPage.clickContinue();
        checkoutPage.verifyMissingPostalCodeError();
        checkoutPage.verifyStepOneUrl();
    });

    it('TC05 - Should redirect to cart when cancel is clicked on step 1', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        checkoutPage.clickCancel();
        cartPage.verifyUrl();
    });

    it('TC06 - Should display correct item and price in order summary', function() {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        checkoutPage.fillCheckoutForm(
            this.checkoutInfo.validInfo.firstName,
            this.checkoutInfo.validInfo.lastName,
            this.checkoutInfo.validInfo.postalCode
        );
        checkoutPage.clickContinue();
        checkoutPage.verifyStepTwoUrl();
        checkoutPage.verifyItemInSummary('Sauce Labs Backpack');
        checkoutPage.verifyItemPriceInSummary('Sauce Labs Backpack', '$29.99');
    });

    it('TC07 - Should display correct total price with multiple items', function() {
        productsPage.addProductToCart('Sauce Labs Backpack');
        productsPage.addProductToCart('Sauce Labs Bike Light');
        cartPage.goToCart();
        cartPage.clickCheckout();
        checkoutPage.fillCheckoutForm(
            this.checkoutInfo.validInfo.firstName,
            this.checkoutInfo.validInfo.lastName,
            this.checkoutInfo.validInfo.postalCode
        );
        checkoutPage.clickContinue();
        checkoutPage.verifyStepTwoUrl();
        checkoutPage.verifyTotalPrice('$43.18');
    });

    it('TC08 - Should complete checkout successfully with multiple items', function() {
        productsPage.addProductToCart('Sauce Labs Backpack');
        productsPage.addProductToCart('Sauce Labs Bike Light');
        cartPage.goToCart();
        cartPage.clickCheckout();
        checkoutPage.fillCheckoutForm(
            this.checkoutInfo.validInfo.firstName,
            this.checkoutInfo.validInfo.lastName,
            this.checkoutInfo.validInfo.postalCode
        );
        checkoutPage.clickContinue();
        checkoutPage.verifyStepTwoUrl();
        checkoutPage.verifyCartItemCount(2);
        checkoutPage.clickFinish();
        checkoutPage.verifyOrderComplete();
    });

    it('TC09 - Should not allow access to protected pages without logging in', () => {
        logoutPage.logout();
        cy.visit('/inventory.html', { failOnStatusCode: false });
        cy.get('.inventory_item').should('not.exist');
    });

    it('TC10 - Should stay on step 1 if continue is clicked without filling the form', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        checkoutPage.verifyStepOneFormVisible();
        checkoutPage.clickContinue();
        checkoutPage.verifyStepOneUrl();
    });

    it('TC11 - Should navigate to step 2 after filling form correctly', function() {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        checkoutPage.fillCheckoutForm(
            this.checkoutInfo.validInfo.firstName,
            this.checkoutInfo.validInfo.lastName,
            this.checkoutInfo.validInfo.postalCode
        );
        checkoutPage.clickContinue();
        checkoutPage.verifyStepTwoUrl();
    });

    it('TC12 - Should display correct item details on checkout overview', function() {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        checkoutPage.fillCheckoutForm(
            this.checkoutInfo.validInfo.firstName,
            this.checkoutInfo.validInfo.lastName,
            this.checkoutInfo.validInfo.postalCode
        );
        checkoutPage.clickContinue();
        checkoutPage.verifyItemInSummary('Sauce Labs Backpack');
        checkoutPage.verifyItemPriceInSummary('Sauce Labs Backpack', '$29.99');
        checkoutPage.verifyCartItemCount(1);
    });
});
