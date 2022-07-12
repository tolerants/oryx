import { CartService } from '@spryker-oryx/cart';
import { QuantityInputComponent } from '@spryker-oryx/cart/quantity-input';
import { ContentController } from '@spryker-oryx/experience';
import { resolve } from '@spryker-oryx/injector';
import { asyncValue } from '@spryker-oryx/lit-rxjs';
import { ProductComponentMixin } from '@spryker-oryx/product';
import { Size } from '@spryker-oryx/ui/utilities';
import { html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { BehaviorSubject, combineLatest } from 'rxjs';
import '../../quantity-input';
import { AddToCartOptions } from './add-to-cart.model';
import { styles } from './add-to-cart.styles';

export class AddToCartComponent extends ProductComponentMixin<AddToCartOptions>() {
  static styles = styles;

  @property() sku!: string;

  protected contentController = new ContentController(this);
  protected loading$ = new BehaviorSubject(false);
  protected cartService = resolve(CartService);
  protected options$ = combineLatest([
    this.contentController.getOptions(),
    this.loading$,
  ]);
  protected quantity = 1;

  protected onSubmit(e: Event, hideQuantityInput: boolean | undefined): void {
    e.preventDefault();

    if (!hideQuantityInput && !this.isValidQuantity()) {
      return;
    }

    this.loading$.next(true);

    this.cartService
      .addEntry({
        sku: this.sku,
        quantity: hideQuantityInput ? 1 : this.quantity,
      })
      .subscribe({
        next: () => {
          this.loading$.next(false);
        },
        error: () => {
          this.loading$.next(false);
        },
      });
  }

  protected isValidQuantity(): boolean {
    const quantityInput = this.shadowRoot?.querySelector(
      'quantity-input'
    ) as QuantityInputComponent;
    return quantityInput.validate();
  }

  protected setQuantity({
    detail: { quantity },
  }: {
    detail: { quantity: number };
  }): void {
    this.quantity = quantity;
  }

  protected override render(): TemplateResult {
    return html`
      ${asyncValue(
        this.options$,
        ([option, loading]) => html`
          <form
            @submit=${(e: Event): void =>
              this.onSubmit(e, option.hideQuantityInput)}
          >
            ${when(
              !option.hideQuantityInput,
              () => html`
                <quantity-input
                  value=${this.quantity}
                  ?disabled=${loading}
                  @update=${this.setQuantity}
                ></quantity-input>
              `
            )}
            <oryx-button icon size=${Size.small} ?loading=${loading}>
              <button>
                <!--TODO: change hardcoded type on enum when it will be available in UI lib -->
                <oryx-icon type="cart-add" size=${Size.large}></oryx-icon>
                Add to Cart
              </button>
            </oryx-button>
          </form>
        `
      )}
    `;
  }
}
