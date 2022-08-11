import { fixture } from '@open-wc/testing-helpers';
import { useComponent } from '@spryker-oryx/core/utilities';
import { getShadowElementBySelector } from '@spryker-oryx/testing';
import { a11yConfig } from '@spryker-oryx/typescript-utils';
import { html } from 'lit';
import { OptionComponent, optionComponent } from './index';

useComponent(optionComponent);

describe('OptionComponent', () => {
  let element: OptionComponent;

  describe('when an icon is given', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-option .icon=${'mock'}></oryx-option>`
      );
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible(a11yConfig);
    });

    it('should render the icon inside the option', () => {
      expect(
        getShadowElementBySelector(element, `oryx-icon:not(.mark)`)
      ).not.toBeNull();
    });
  });

  describe('values', () => {
    describe('when the item has no value', () => {
      beforeEach(async () => {
        const parent = await fixture(
          html`<div>
            <oryx-option>mock inner text</oryx-option>
          </div>`
        );
        element = parent.querySelector('oryx-option') as OptionComponent;
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      it('should return the innerText', () => {
        expect(element.value).toBe('mock inner text');
      });
    });

    describe('when the item has a value', () => {
      beforeEach(async () => {
        const parent = await fixture(
          html`<div>
            <oryx-option value="mock value">mock inner text</oryx-option>
          </div>`
        );
        element = parent.querySelector('oryx-option') as OptionComponent;
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      it('should return the innerText', () => {
        expect(element.value).toBe('mock value');
      });
    });
  });
});
