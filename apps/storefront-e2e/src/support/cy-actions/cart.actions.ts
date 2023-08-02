import { CartPage } from '../page-objects/cart.page';

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      goToCart(): Chainable<void>;
      goToGuestCart(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('goToCart', () => {
  openCartPage('/customers/DE--**/carts?**');
});

Cypress.Commands.add('goToGuestCart', () => {
  openCartPage('/guest-carts?**');
});

function openCartPage(getCartsUrl: string) {
  const cartPage = new CartPage();

  cy.intercept(getCartsUrl).as('cartsRequest');
  cartPage.visit();
  cy.wait('@cartsRequest');
}
