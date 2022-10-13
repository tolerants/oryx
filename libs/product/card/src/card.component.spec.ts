import { fixture } from '@open-wc/testing-helpers';
import { contentLinkComponent } from '@spryker-oryx/content';
import * as core from '@spryker-oryx/core';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector } from '@spryker-oryx/injector';
import { ProductContext } from '@spryker-oryx/product';
import { mockProductProviders } from '@spryker-oryx/product/mocks';
import { ProductTitleComponent } from '@spryker-oryx/product/title';
import { siteProviders } from '@spryker-oryx/site';
import { html } from 'lit';
import { of } from 'rxjs';
import { SpyInstance } from 'vitest';
import { ProductCardComponent } from './card.component';
import { productCardComponent } from './card.def';

const mockContext = {
  get: vi.fn().mockReturnValue(of('1')),
  provide: vi.fn(),
};
vi.spyOn(core, 'ContextController') as SpyInstance;
(core.ContextController as unknown as SpyInstance).mockReturnValue(mockContext);

describe('ProductCardComponent', () => {
  let element: ProductCardComponent;

  beforeAll(async () => {
    await useComponent([productCardComponent, contentLinkComponent]);
  });

  beforeEach(async () => {
    createInjector({
      providers: [...mockProductProviders, ...siteProviders],
    });

    element = await fixture(html`<product-card uid="1"></product-card>`);
  });

  afterEach(() => {
    destroyInjector();
    vi.clearAllMocks();
  });

  const getTitle = (): ProductTitleComponent => {
    return element.shadowRoot?.querySelector(
      'product-title'
    ) as ProductTitleComponent;
  };

  const dispatchLinkEvent = (eventType: string): void => {
    element.shadowRoot
      ?.querySelector('content-link')
      ?.dispatchEvent(new Event(eventType));
  };

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should render inner components', () => {
    expect(element).toContainElement('content-link');
    expect(element).toContainElement('product-media');
    expect(element).toContainElement('product-title');
    expect(element).toContainElement('product-price');
    expect(element).toContainElement('product-average-rating');
    expect(element).toContainElement('add-to-cart');
    expect(element).toContainElement('product-labels');

    //TODO: replace by favorites component
    expect(element).toContainElement('oryx-icon-button');
  });

  describe('should fill context with', () => {
    const propSku = 'propSku';
    const optionsSku = 'optionSku';

    it('sku from the property', async () => {
      await fixture(html`<product-card sku="${propSku}"></product-card>`);

      expect(mockContext.provide).toHaveBeenCalledWith(
        ProductContext.SKU,
        propSku
      );
    });

    it('sku from the options', async () => {
      await fixture(
        html`<product-card .options="${{ sku: optionsSku }}"></product-card>`
      );

      expect(mockContext.provide).toHaveBeenCalledWith(
        ProductContext.SKU,
        optionsSku
      );
    });

    it('sku from options if provided both', async () => {
      await fixture(
        html`<product-card
          sku="${propSku}"
          .options="${{ sku: optionsSku }}"
        ></product-card>`
      );

      expect(mockContext.provide).toHaveBeenCalledWith(
        ProductContext.SKU,
        optionsSku
      );
    });
  });

  describe('when card is not active', () => {
    describe('and it`s hovered', () => {
      beforeEach(() => {
        dispatchLinkEvent('mouseenter');
      });

      it('should set "active" attr', () => {
        expect(element.hasAttribute('active')).toBe(true);
      });
    });

    describe('and it`s focused', () => {
      beforeEach(() => {
        dispatchLinkEvent('focus');
      });

      it('should set "active" attr', () => {
        expect(element.hasAttribute('active')).toBe(true);
      });
    });
  });

  describe('when card is active', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<product-card uid="1" active></product-card>`
      );
    });

    describe('and it lost hover', () => {
      beforeEach(() => {
        dispatchLinkEvent('mouseleave');
      });

      it('should remove "active" attr', () => {
        expect(element.hasAttribute('active')).toBe(false);
      });
    });

    describe('and it lost focus', () => {
      beforeEach(() => {
        dispatchLinkEvent('blur');
      });

      it('should remove "active" attr', () => {
        expect(element.hasAttribute('active')).toBe(false);
      });
    });
  });

  describe('title truncation', () => {
    it('should set default value when option is not provided', () => {
      expect(getTitle().options?.truncateAfter).toBe(1);
    });

    describe('when option is provided', () => {
      const truncateTitleAfter = 3;
      beforeEach(async () => {
        element = await fixture(html`
          <product-card
            uid="1"
            .options=${{ truncateTitleAfter }}
          ></product-card>
        `);
      });

      it('should pass the value to the product-title', async () => {
        expect(getTitle().options?.truncateAfter).toBe(truncateTitleAfter);
      });
    });

    describe('when card is active', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <product-card uid="1" active></product-card>
        `);
      });

      it('should pass 0 to product-title', () => {
        expect(getTitle().options?.truncateAfter).toBe(0);
      });
    });
  });

  describe('when "hideTitle" option is provided', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <product-card
          uid="1"
          .options=${{
            hideTitle: true,
          }}
        ></product-card>
      `);
    });

    it('should not render product-title', () => {
      expect(element).not.toContainElement('product-title');
    });
  });

  describe('when "hidePrice" option is provided', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <product-card
          uid="1"
          .options=${{
            hidePrice: true,
          }}
        ></product-card>
      `);
    });

    it('should not render product-price', () => {
      expect(element).not.toContainElement('product-price');
    });
  });

  describe('when "hideRating" option is provided', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <product-card
          uid="1"
          .options=${{
            hideRating: true,
          }}
        ></product-card>
      `);
    });

    it('should not render product-average-rating', () => {
      expect(element).not.toContainElement('product-average-rating');
    });
  });

  describe('when "hideLabels" option is provided', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <product-card
          uid="1"
          .options=${{
            hideLabels: true,
          }}
        ></product-card>
      `);
    });

    it('should not render product-labels', () => {
      expect(element).not.toContainElement('product-labels');
    });
  });

  describe('when "hideFavorites" option is provided', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <product-card
          uid="1"
          .options=${{
            hideFavorites: true,
          }}
        ></product-card>
      `);
    });

    it('should not render the favorites button', () => {
      expect(element).not.toContainElement('oryx-icon-button');
    });
  });

  describe('click handling', () => {
    let clickEvent: MouseEvent;
    let handler: HTMLElement | null | undefined;

    beforeEach(() => {
      clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
    });

    describe('when click on the form', () => {
      beforeEach(async () => {
        element = await fixture(html` <product-card uid="1"></product-card> `);

        handler = element.shadowRoot?.querySelector('add-to-cart');
      });

      it('should not prevent the event', () => {
        const expectation = vi.spyOn(clickEvent, 'preventDefault');
        handler?.dispatchEvent(clickEvent);
        expect(expectation).not.toHaveBeenCalled();
      });

      it('should stop the propagation of the event', () => {
        const expectation = vi.spyOn(clickEvent, 'stopPropagation');
        handler?.dispatchEvent(clickEvent);
        expect(expectation).toHaveBeenCalled();
      });
    });

    describe('when click on other focusable element', () => {
      beforeEach(async () => {
        element = await fixture(html` <product-card uid="1"></product-card> `);

        handler = element.shadowRoot?.querySelector(
          'oryx-icon-button > button'
        );
      });

      it('should prevent the event', () => {
        const expectation = vi.spyOn(clickEvent, 'preventDefault');
        handler?.dispatchEvent(clickEvent);
        expect(expectation).toHaveBeenCalled();
      });

      it('should stop the propagation of the event', () => {
        const expectation = vi.spyOn(clickEvent, 'stopPropagation');
        handler?.dispatchEvent(clickEvent);
        expect(expectation).toHaveBeenCalled();
      });
    });

    describe('when click on non-focusable content', () => {
      beforeEach(async () => {
        element = await fixture(html` <product-card uid="1"></product-card> `);

        handler = element.shadowRoot?.querySelector('product-title');
      });

      it('should not prevent the event', () => {
        const expectation = vi.spyOn(clickEvent, 'preventDefault');
        handler?.dispatchEvent(clickEvent);
        expect(expectation).not.toHaveBeenCalled();
      });

      it('should not stop the propagation of the event', () => {
        const expectation = vi.spyOn(clickEvent, 'stopPropagation');
        handler?.dispatchEvent(clickEvent);
        expect(expectation).not.toHaveBeenCalled();
      });
    });
  });
});
