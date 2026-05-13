import 'cypress-xpath';

// Credenciais por defeito do SauceDemo — permite usar cy.login() sem argumentos nos beforeEach
Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
    cy.visit('/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
});
