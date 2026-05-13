const elements = {
    pageTitle: () => cy.get('.title'),
    productItems: () => cy.get('.inventory_item'),
    productButton: (productName) => cy.contains('.inventory_item', productName).find('button'),
    cartBadge: () => cy.get('.shopping_cart_badge'),
    cartLink: () => cy.get('.shopping_cart_link'),
};

export const productsPage = {
    verifyPageTitle() {
        elements.pageTitle().should('have.text', 'Products');
    },

    verifyProductCount(expectedCount) {
        elements.productItems().should('have.length', expectedCount);
    },

    addProductToCart(productName) {
        elements.productButton(productName).click();
    },

    removeProductFromCart(productName) {
        elements.productButton(productName).click();
    },

    verifyCartBadgeCount(expectedCount) {
        elements.cartBadge().should('have.text', String(expectedCount));
    },

    verifyCartBadgeNotVisible() {
        elements.cartBadge().should('not.exist');
    },

    goToCart() {
        elements.cartLink().click();
    },

    verifyProductPrice(productName, expectedPrice) {
        cy.contains('.inventory_item', productName)
            .find('.inventory_item_price')
            .should('have.text', expectedPrice);
    },

    verifyProductDescription(productName, expectedDescription) {
        cy.contains('.inventory_item', productName)
            .find('.inventory_item_desc')
            .should('have.text', expectedDescription);
    },
};
