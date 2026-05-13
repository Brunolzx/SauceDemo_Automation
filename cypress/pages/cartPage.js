const elements = {
    cartItems: () => cy.get('.cart_item'),
    cartBadge: () => cy.get('.shopping_cart_badge'),
    cartLink: () => cy.get('.shopping_cart_link'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
    removeButton: (itemName) => cy.contains('.cart_item', itemName).find('button'),
};

export const cartPage = {
    goToCart() {
        elements.cartLink().click();
    },

    verifyUrl() {
        cy.url().should('include', '/cart.html');
    },

    verifyCartItemCount(expectedCount) {
        elements.cartItems().should('have.length', expectedCount);
    },

    verifyCartIsEmpty() {
        elements.cartItems().should('have.length', 0);
    },

    verifyItemInCart(itemName) {
        cy.contains('.cart_item', itemName).should('be.visible');
    },

    verifyItemPrice(itemName, expectedPrice) {
        cy.contains('.cart_item', itemName)
            .find('.inventory_item_price')
            .should('have.text', expectedPrice);
    },

    verifyItemDescription(itemName, expectedDesc) {
        cy.contains('.cart_item', itemName)
            .find('.inventory_item_desc')
            .should('have.text', expectedDesc);
    },

    removeItemFromCart(itemName) {
        elements.removeButton(itemName).click();
    },

    verifyCartBadgeCount(expectedCount) {
        elements.cartBadge().should('have.text', String(expectedCount));
    },

    verifyCartBadgeNotVisible() {
        elements.cartBadge().should('not.exist');
    },

    clickCheckout() {
        elements.checkoutButton().click();
    },

    clickContinueShopping() {
        elements.continueShoppingButton().click();
    },
};
