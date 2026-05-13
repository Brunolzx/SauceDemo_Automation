const elements = {
    menuButton: () => cy.get('#react-burger-menu-btn'),
    logoutButton: () => cy.get('#logout_sidebar_link'),
    loginButton: () => cy.get('[data-test="login-button"]'),
};

export const logoutPage = {
    clickMenuButton() {
        elements.menuButton().click();
    },

    clickLogoutButton() {
        elements.logoutButton().click();
    },

    logout() {
        this.clickMenuButton();
        this.clickLogoutButton();
    },

    verifyLoggedOut() {
        elements.loginButton().should('be.visible');
    },

    verifyLoginPageVisible() {
        cy.get('[data-test="username"]').should('be.visible');
        elements.loginButton().should('be.visible');
    },

    verifySessionCleared() {
        cy.reload();
        elements.loginButton().should('be.visible');
    },

    // Após logout, o SauceDemo retorna 404 para páginas protegidas (autenticação server-side).
    // failOnStatusCode: false permite ao Cypress continuar e verificar o conteúdo da página.
    verifyCannotAccessInventory() {
        cy.visit('/inventory.html', { failOnStatusCode: false });
        cy.get('.inventory_item').should('not.exist');
    },

    verifyCannotAccessCart() {
        cy.visit('/cart.html', { failOnStatusCode: false });
        cy.get('.cart_item').should('not.exist');
    },

    verifyCannotAccessCheckout() {
        cy.visit('/checkout-step-one.html', { failOnStatusCode: false });
        cy.get('[data-test="firstName"]').should('not.exist');
    },

    verifyCanLoginAgain(username = 'standard_user', password = 'secret_sauce') {
        cy.login(username, password);
        cy.url().should('include', '/inventory.html');
    },
};
