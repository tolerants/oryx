import { ProductComponentProperties } from '@spryker-oryx/product';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../.constants';
import { MockProductService, setupProductMocks } from '../../../src/mocks';
import '../index';
import { ProductTitleContent } from '../model';

export default {
  title: `${storybookPrefix}/Title`,
  loaders: [setupProductMocks],
} as unknown as Meta;

type Props = ProductTitleContent & ProductComponentProperties;

const Template: Story<Props> = (props: Props): TemplateResult => {
  return html`<product-title .sku=${props.sku} .content=${props} />`;
};

export const TitleDemo = Template.bind({});

TitleDemo.args = {
  sku: MockProductService.mockProducts[0].sku,
  tag: '',
  singleLine: false,
};

TitleDemo.argTypes = {
  sku: {
    control: { type: 'select' },
    options: [
      ...MockProductService.mockProducts.map((p) => p.sku),
      'not-found',
    ],
    table: { category: 'product' },
  },
  tag: {
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    control: { type: 'select' },
    table: { category: 'component' },
  },
  singleLine: {
    table: { category: 'component' },
  },
};
