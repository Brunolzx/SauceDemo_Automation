import { inventoryPage } from '../pages/inventoryPage';

describe('Inventory', () => {
    beforeEach(() => {
        cy.login();
    });

    it('TC01 - Should display 6 products on the inventory page', () => {
        inventoryPage.verifyPageTitle();
        inventoryPage.verifyProductCount(6);
    });

    it('TC02 - Should display products sorted A-Z by default', () => {
        inventoryPage.verifySortedAZ();
    });

    it('TC03 - Should sort products from Z to A', () => {
        inventoryPage.sortBy('za');
        inventoryPage.verifySortedZA();
    });

    it('TC04 - Should sort products by price low to high', () => {
        inventoryPage.sortBy('lohi');
        inventoryPage.verifySortedPriceLowHigh();
    });

    it('TC05 - Should sort products by price high to low', () => {
        inventoryPage.sortBy('hilo');
        inventoryPage.verifySortedPriceHighLow();
    });

    it('TC06 - Should navigate to product detail by clicking the product name', () => {
        inventoryPage.clickProductName('Sauce Labs Backpack');
        inventoryPage.verifyDetailPageUrl();
        inventoryPage.verifyDetailProductName('Sauce Labs Backpack');
        inventoryPage.verifyDetailProductPrice('$29.99');
    });

    it('TC07 - Should navigate to product detail by clicking the product image', () => {
        inventoryPage.clickProductImage('Sauce Labs Backpack');
        inventoryPage.verifyDetailPageUrl();
        inventoryPage.verifyDetailProductName('Sauce Labs Backpack');
    });

    it('TC08 - Should add product to cart from the detail page', () => {
        inventoryPage.clickProductName('Sauce Labs Backpack');
        inventoryPage.addToCartFromDetail();
        inventoryPage.verifyCartBadgeCount(1);
    });

    it('TC09 - Should navigate back to inventory from the detail page', () => {
        inventoryPage.clickProductName('Sauce Labs Backpack');
        inventoryPage.verifyDetailPageUrl();
        inventoryPage.clickBackToProducts();
        inventoryPage.verifyPageTitle();
    });

    it('TC10 - Should preserve cart badge after navigating back from detail page', () => {
        inventoryPage.clickProductName('Sauce Labs Backpack');
        inventoryPage.addToCartFromDetail();
        inventoryPage.clickBackToProducts();
        inventoryPage.verifyPageTitle();
        inventoryPage.verifyCartBadgeCount(1);
    });
});
