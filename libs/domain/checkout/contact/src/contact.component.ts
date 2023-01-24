import {
  CheckoutDataService,
  CheckoutForm,
  ContactDetails,
} from '@spryker-oryx/checkout';
import { resolve } from '@spryker-oryx/di';
import { ComponentMixin } from '@spryker-oryx/experience';
import { FormComponentInterface } from '@spryker-oryx/form';
import { html, LitElement, TemplateResult } from 'lit';
import { createRef, Ref, ref } from 'lit/directives/ref.js';

export class CheckoutContactComponent
  extends ComponentMixin()
  implements CheckoutForm
{
  protected checkoutDataService = resolve(CheckoutDataService);

  protected formRef: Ref<LitElement & FormComponentInterface> = createRef();

  protected getFormElement(): HTMLFormElement | null | undefined {
    return this.formRef.value?.getForm?.();
  }

  submit(report = false): boolean {
    const form = this.getFormElement();

    if (!form?.checkValidity()) {
      if (report) {
        form?.reportValidity();
      }

      this.checkoutDataService.setCustomer(null);

      return false;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    this.checkoutDataService.setCustomer(data as unknown as ContactDetails);

    return true;
  }

  protected override render(): TemplateResult {
    return html` <user-contact-form ${ref(this.formRef)}></user-contact-form> `;
  }
}
