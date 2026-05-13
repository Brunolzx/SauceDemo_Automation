# Cypress POM SauceDemo

End-to-end test automation project for [SauceDemo](https://www.saucedemo.com) using Cypress with the Page Object Model (POM) pattern.

## Tech Stack

- [Cypress](https://www.cypress.io/) v15
- JavaScript (ES Modules)
- Page Object Model (POM)

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Running Tests

| Command | Description |
|---|---|
| `npm run cy:open` | Opens Cypress Test Runner (interactive mode) |
| `npm run cy:run` | Runs all tests headless |
| `npm run cy:run:login` | Runs login tests only |
| `npm run cy:run:logout` | Runs logout tests only |
| `npm run cy:run:cart` | Runs cart tests only |
| `npm run cy:run:checkout` | Runs checkout tests only |

## Project Structure

```
cypress/
├── e2e/                    # Test specs
│   ├── login.cy.js
│   ├── logout.cy.js
│   ├── inventory.cy.js
│   ├── cart.cy.js
│   └── checkout.cy.js
├── pages/                  # Page Objects
│   ├── loginPage.js
│   ├── logoutPage.js
│   ├── inventoryPage.js
│   ├── productsPage.js
│   ├── cartPage.js
│   └── checkoutPage.js
├── fixtures/               # Test data
│   ├── users.json
│   └── checkout.json
└── support/
    ├── commands.js         # Custom commands (cy.login)
    └── e2e.js
```

## Test Coverage

| Suite | Tests | What it covers |
|---|---|---|
| Login | 8 | Valid/invalid credentials, missing fields, locked user, special characters |
| Logout | 8 | Logout flow, session clearing, protected page access, re-login |
| Inventory | 10 | Product listing, 4 sort options, product detail navigation, add to cart |
| Cart | 13 | Add/remove items, badge count, persistence on refresh, item details, navigation |
| Checkout | 12 | Full checkout flow, form validation, order summary, total price, multi-item |
| **Total** | **51** | |

## SauceDemo Test Users

| Username | Password | Behaviour |
|---|---|---|
| `standard_user` | `secret_sauce` | Default user — all flows work as expected |
| `locked_out_user` | `secret_sauce` | Login is blocked |
| `problem_user` | `secret_sauce` | Broken images, bugs in cart and checkout |
| `performance_glitch_user` | `secret_sauce` | Login takes ~5 seconds |
| `error_user` | `secret_sauce` | Errors thrown during cart and checkout interactions |

## Notes

- After logout, SauceDemo returns HTTP 404 for all protected pages (server-side session check). Tests that verify post-logout access use `{ failOnStatusCode: false }` and assert on page content instead of URL.
- Inventory sorting tests compare the DOM order against a JS-sorted copy of the same data, so they remain valid regardless of catalogue changes.
