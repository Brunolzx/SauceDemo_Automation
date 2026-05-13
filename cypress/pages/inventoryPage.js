const elements = {
    pageTitle: () => cy.get('.title'),
    sortDropdown: () => cy.get('[data-test="product-sort-container"]'),
    productItems: () => cy.get('.inventory_item'),
    productNames: () => cy.get('.inventory_item_name'),
    productPrices: () => cy.get('.inventory_item_price'),
    cartBadge: () => cy.get('.shopping_cart_badge'),
    // página de detalhe do produto
    detailName: () => cy.get('.inventory_details_name'),
    detailPrice: () => cy.get('.inventory_details_price'),
    detailAddToCartButton: () => cy.get('[data-test^="add-to-cart"]'),
    backButton: () => cy.get('[data-test="back-to-products"]'),
};

export const inventoryPage = {
    verifyPageTitle() {
        elements.pageTitle().should('have.text', 'Products');
    },

    verifyProductCount(expectedCount) {
        elements.productItems().should('have.length', expectedCount);
    },

    sortBy(option) {
        elements.sortDropdown().select(option);
    },

    verifySortedAZ() {
        // Captura os nomes do DOM, compara com uma cópia ordenada em JS —
        // não depende de nomes de produtos fixos, funciona mesmo que o catálogo mude
        elements.productNames().then(($names) => {
            const names = [...$names].map(el => el.innerText);
            expect(names).to.deep.equal([...names].sort());
        });
    },

    verifySortedZA() {
        elements.productNames().then(($names) => {
            const names = [...$names].map(el => el.innerText);
            expect(names).to.deep.equal([...names].sort().reverse());
        });
    },

    verifySortedPriceLowHigh() {
        elements.productPrices().then(($prices) => {
            const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
            expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
        });
    },

    verifySortedPriceHighLow() {
        elements.productPrices().then(($prices) => {
            const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
            expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
        });
    },

    clickProductName(productName) {
        cy.contains('.inventory_item_name', productName).click();
    },

    clickProductImage(productName) {
        cy.contains('.inventory_item', productName)
            .find('.inventory_item_img a')
            .click();
    },

    verifyDetailPageUrl() {
        cy.url().should('include', '/inventory-item.html');
    },

    verifyDetailProductName(expectedName) {
        elements.detailName().should('have.text', expectedName);
    },

    verifyDetailProductPrice(expectedPrice) {
        elements.detailPrice().should('have.text', expectedPrice);
    },

    addToCartFromDetail() {
        elements.detailAddToCartButton().click();
    },

    clickBackToProducts() {
        elements.backButton().click();
    },

    verifyCartBadgeCount(expectedCount) {
        elements.cartBadge().should('have.text', String(expectedCount));
    },

    verifyCartBadgeNotVisible() {
        elements.cartBadge().should('not.exist');
    },
};
