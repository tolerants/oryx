import { fixture, html } from '@open-wc/testing-helpers';
import { getShadowElementBySelector } from '@spryker-oryx/testing';
import { ErrorMessageComponent } from '../../../error-message';
import './index';
import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let element: RadioComponent;

  describe('when radio is projected', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-radio><input type="radio" /> Option</oryx-radio>`
      );
    });

    it('should project the input element to component', () => {
      const [input] = getShadowElementBySelector(
        element,
        'slot'
      )?.assignedElements() as Element[];

      expect(input.getAttribute('type')).toBe('radio');
    });
  });

  describe('when radio has error provided', () => {
    let errorMessage: ErrorMessageComponent | null;
    beforeEach(async () => {
      element = await fixture<RadioComponent>(
        html`<oryx-radio errorMessage="error">
          <input type="radio" /> Option
        </oryx-radio>`
      );
      errorMessage =
        element?.renderRoot?.querySelector('oryx-error-message') || null;
    });

    it('the host should have hasError attribute', () => {
      expect(element?.hasAttribute('hasError')).toBe(true);
    });

    it('should pass error message to component', () => {
      expect(errorMessage?.message).toBe('error');
    });
  });
});
