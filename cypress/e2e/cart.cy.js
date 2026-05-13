import { productsPage } from '../pages/productsPage';
import { cartPage } from '../pages/cartPage';

describe('Cart', () => {
    beforeEach(() => {
        cy.login();
    });

    it('TC01 - Should add item to cart and update badge', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        productsPage.verifyCartBadgeCount(1);
    });

    it('TC02 - Should remove item from cart and clear badge', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.verifyCartItemCount(1);
        cartPage.removeItemFromCart('Sauce Labs Backpack');
        cartPage.verifyCartItemCount(0);
        cartPage.verifyCartBadgeNotVisible();
    });

    it('TC03 - Should display the correct item name in cart', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.verifyItemInCart('Sauce Labs Backpack');
    });

    it('TC04 - Should update cart badge count when adding and removing items', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        productsPage.verifyCartBadgeCount(1);
        productsPage.addProductToCart('Sauce Labs Bike Light');
        productsPage.verifyCartBadgeCount(2);
        cartPage.goToCart();
        cartPage.verifyCartItemCount(2);
        cartPage.removeItemFromCart('Sauce Labs Backpack');
        cartPage.verifyCartItemCount(1);
        cartPage.verifyCartBadgeCount(1);
    });

    it('TC05 - Should navigate to cart page when clicking the cart icon', () => {
        cartPage.goToCart();
        cartPage.verifyUrl();
    });

    it('TC06 - Should persist cart items after page refresh', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        productsPage.verifyCartBadgeCount(1);
        cy.reload();
        productsPage.verifyCartBadgeCount(1);
        cartPage.goToCart();
        cartPage.verifyCartItemCount(1);
    });

    it('TC07 - Should add multiple different items to cart', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        productsPage.addProductToCart('Sauce Labs Bike Light');
        productsPage.verifyCartBadgeCount(2);
        cartPage.goToCart();
        cartPage.verifyCartItemCount(2);
        cartPage.verifyItemInCart('Sauce Labs Backpack');
        cartPage.verifyItemInCart('Sauce Labs Bike Light');
    });

    it('TC08 - Should add and remove multiple items sequentially', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        productsPage.addProductToCart('Sauce Labs Bike Light');
        productsPage.verifyCartBadgeCount(2);
        cartPage.goToCart();
        cartPage.verifyCartItemCount(2);
        cartPage.removeItemFromCart('Sauce Labs Backpack');
        cartPage.verifyCartItemCount(1);
        cartPage.verifyCartBadgeCount(1);
        cartPage.removeItemFromCart('Sauce Labs Bike Light');
        cartPage.verifyCartItemCount(0);
        cartPage.verifyCartBadgeNotVisible();
    });

    it('TC09 - Should display the correct item price in cart', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.verifyItemPrice('Sauce Labs Backpack', '$29.99');
    });

    it('TC10 - Should navigate back to inventory when clicking continue shopping', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickContinueShopping();
        cy.url().should('include', '/inventory.html');
    });

    it('TC11 - Should navigate to checkout when clicking checkout button', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.clickCheckout();
        cy.url().should('include', '/checkout-step-one.html');
    });

    it('TC12 - Should display correct item details (name and price) in cart', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        cartPage.goToCart();
        cartPage.verifyItemInCart('Sauce Labs Backpack');
        cartPage.verifyItemPrice('Sauce Labs Backpack', '$29.99');
    });

    it('TC13 - Should display correct count in badge when adding three items', () => {
        productsPage.addProductToCart('Sauce Labs Backpack');
        productsPage.addProductToCart('Sauce Labs Bike Light');
        productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');
        productsPage.verifyCartBadgeCount(3);
        cartPage.goToCart();
        cartPage.verifyCartItemCount(3);
    });
});
