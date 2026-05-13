const elements = {
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    postalCodeInput: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    cancelButton: () => cy.get('[data-test="cancel"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    cartItems: () => cy.get('.cart_item'),
    summaryTotal: () => cy.get('.summary_total_label'),
    orderCompleteHeader: () => cy.get('.complete-header'),
};

export const checkoutPage = {
    fillCheckoutForm(firstName, lastName, postalCode) {
        // cy.type() lança erro com string vazia — ignoramos o campo para simular campos não preenchidos
        if (firstName) elements.firstNameInput().type(firstName);
        if (lastName) elements.lastNameInput().type(lastName);
        if (postalCode) elements.postalCodeInput().type(postalCode);
    },

    clickContinue() {
        elements.continueButton().click();
    },

    clickCancel() {
        elements.cancelButton().click();
    },

    clickFinish() {
        elements.finishButton().click();
    },

    verifyErrorMessage(expectedMessage) {
        elements.errorMessage().should('be.visible').and('contain', expectedMessage);
    },

    verifyMissingFirstNameError() {
        this.verifyErrorMessage('Error: First Name is required');
    },

    verifyMissingLastNameError() {
        this.verifyErrorMessage('Error: Last Name is required');
    },

    verifyMissingPostalCodeError() {
        this.verifyErrorMessage('Error: Postal Code is required');
    },

    verifyStepOneUrl() {
        cy.url().should('include', '/checkout-step-one.html');
    },

    verifyStepTwoUrl() {
        cy.url().should('include', '/checkout-step-two.html');
    },

    verifyCompleteUrl() {
        cy.url().should('include', '/checkout-complete.html');
    },

    verifyOrderComplete() {
        elements.orderCompleteHeader().should('be.visible').and('contain', 'Thank you for your order!');
    },

    verifyItemInSummary(itemName) {
        cy.contains('.cart_item', itemName).should('be.visible');
    },

    verifyItemPriceInSummary(itemName, expectedPrice) {
        cy.contains('.cart_item', itemName)
            .find('.inventory_item_price')
            .should('have.text', expectedPrice);
    },

    verifyTotalPrice(expectedTotal) {
        elements.summaryTotal().should('contain', expectedTotal);
    },

    verifyCartItemCount(expectedCount) {
        elements.cartItems().should('have.length', expectedCount);
    },

    verifyStepOneFormVisible() {
        elements.firstNameInput().should('be.visible');
        elements.lastNameInput().should('be.visible');
        elements.postalCodeInput().should('be.visible');
        elements.continueButton().should('be.visible');
        elements.cancelButton().should('be.visible');
    },
};
