import { fixture } from '@open-wc/testing-helpers';
import { CartService } from '@spryker-oryx/cart';
import {
  createInjector,
  destroyInjector,
  Injector,
} from '@spryker-oryx/injector';
import '@spryker-oryx/testing';
import { html } from 'lit';
import { of } from 'rxjs';
import { QuantityInputComponent } from '../../quantity-input';
import '../index';
import { AddToCartComponent } from './add-to-cart.component';

class MockCartService implements CartService {
  load = vi.fn().mockReturnValue({});
  getCart = vi.fn().mockReturnValue(of({}));
  getCartError = vi.fn().mockReturnValue(of({}));
  getTotals = vi.fn().mockReturnValue(of({}));
  getEntries = vi.fn().mockReturnValue(of([]));
  addEntry = vi.fn().mockReturnValue(of(null));
  updateEntry = vi.fn().mockReturnValue(of(null));
  deleteEntry = vi.fn().mockReturnValue(of(null));
}

describe('Add to cart', () => {
  let element: AddToCartComponent;

  let service: Partial<MockCartService>;
  let testInjector: Injector;

  beforeEach(() => {
    testInjector = createInjector({
      providers: [
        {
          provide: CartService,
          useClass: MockCartService,
        },
      ],
    });

    service = <MockCartService>testInjector.inject(CartService);
  });

  afterEach(() => {
    vi.clearAllMocks();
    destroyInjector();
  });

  describe('when "hideQuantityInput" prop is true', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<add-to-cart
          sku="1"
          .options=${{ hideQuantityInput: true }}
        ></add-to-cart>`
      );
    });

    describe('and form is submitted', () => {
      beforeEach(() => {
        const form = element.renderRoot.querySelector(
          'form'
        ) as HTMLFormElement;
        form.submit();
      });

      it('should call "addEntry" cart service method', () => {
        expect(service.addEntry).toHaveBeenCalledWith({
          sku: '1',
          quantity: 1,
        });
      });
    });

    it('should not render quantity controls', () => {
      const quantityControls = element.renderRoot.querySelector(
        'quantity-input'
      ) as QuantityInputComponent;

      expect(quantityControls).toBeNull();
    });
  });

  describe('when "hideQuantityInput" prop is false', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<add-to-cart
          sku="1"
          .options=${{ hideQuantityInput: false }}
        ></add-to-cart>`
      );
    });

    describe('and form is submitted', () => {
      beforeEach(() => {
        const form = element.renderRoot.querySelector(
          'form'
        ) as HTMLFormElement;
        form.submit();
      });

      it('should call "addEntry" cart service method', () => {
        expect(service.addEntry).toHaveBeenCalledWith({
          sku: '1',
          quantity: 1,
        });
      });
    });

    describe('then number was increased and form is submitted', () => {
      beforeEach(() => {
        const quantityInput = element.renderRoot.querySelector(
          'quantity-input'
        ) as QuantityInputComponent;
        quantityInput.value = 1.5;

        const increaseButton = quantityInput.renderRoot.querySelector(
          'button[aria-label="increase"]'
        ) as HTMLButtonElement;
        increaseButton.click();

        const form = element.renderRoot.querySelector(
          'form'
        ) as HTMLFormElement;
        form.submit();
      });

      it('should call "addEntry" cart service method', () => {
        expect(service.addEntry).toHaveBeenCalledWith({
          sku: '1',
          quantity: 2,
        });
      });
    });

    describe('then wrong number is provided and form is submitted', () => {
      beforeEach(() => {
        const quantityInput = element.renderRoot.querySelector(
          'quantity-input'
        ) as QuantityInputComponent;
        quantityInput.value = 1.5;

        const input = quantityInput.renderRoot.querySelector(
          'input'
        ) as HTMLInputElement;
        input.setAttribute('value', '1.5');

        const form = element.renderRoot.querySelector(
          'form'
        ) as HTMLFormElement;
        form.submit();
      });

      it('should not call "addEntry" cart service method', () => {
        expect(service.addEntry).not.toHaveBeenCalled();
      });
    });

    it('should render quantity controls', () => {
      const quantityControls = element.renderRoot.querySelector(
        'oryx-button'
      ) as HTMLElement;

      expect(quantityControls).not.toBeNull();
    });
  });
});
