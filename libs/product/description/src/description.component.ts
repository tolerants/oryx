import { hydratable } from '@spryker-oryx/core';
import { ContentController } from '@spryker-oryx/experience';
import { asyncValue } from '@spryker-oryx/lit-rxjs';
import {
  ProductComponentMixin,
  ProductController,
} from '@spryker-oryx/product';
import { TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html } from 'lit/static-html.js';
import { descriptionStyles } from './description.styles';
import { ProductDescriptionContent } from './model';
import { convertLineFeedsToHTML } from './utils';

@hydratable(['mouseover', 'window:resize'])
export class ProductDescriptionComponent extends ProductComponentMixin<ProductDescriptionContent>() {
  static styles = descriptionStyles;

  protected options$ = new ContentController(this).getOptions();
  protected product$ = new ProductController(this).getProduct();

  protected override render(): TemplateResult {
    return html`
      ${asyncValue(
        this.options$,
        (options) => html`<oryx-text
          .truncateAfter=${options.truncateAfter ?? 0}
          ?showToggle=${!!options.showToggle}
          ?expanded=${!!options.expanded}
        >
          ${asyncValue(
            this.product$,
            (product) => html`${unsafeHTML(this.convert(product.description))}`
          )}
        </oryx-text>`
      )}
    `;
  }

  protected convert(text?: string): string {
    return convertLineFeedsToHTML(text ?? '');
  }
}
