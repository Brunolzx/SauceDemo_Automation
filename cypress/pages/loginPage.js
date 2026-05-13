const elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]')
};

export const loginPage = {
    enterUsername(username) {
        elements.usernameInput().clear().type(username);
    },

    enterPassword(password) {
        elements.passwordInput().clear().type(password);
    },

    clickLoginButton() {
        elements.loginButton().click();
    },

    errorMessage() {
        return elements.errorMessage();
    }
};