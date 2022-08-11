import { generateVariantsMatrix, Variant } from '@spryker-oryx/ui/utilities';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../../../.constants';

export default {
  title: `${storybookPrefix}/Navigations/Pagination/Static`,
} as Meta;

interface PaginationState extends Variant {
  options: {
    className?: string;
    disabled?: boolean;
  };
}

const variants: PaginationState[] = [
  {
    categoryY: '3rd page',
    categoryX: 'Default',
    options: {},
  },
  {
    categoryY: '3rd page',
    categoryX: 'Hover',
    options: {
      className: 'pseudo-hover',
    },
  },
  {
    categoryY: '3rd page',
    categoryX: 'Active',
    options: {
      className: 'pseudo-active',
    },
  },
  {
    categoryY: '3rd page',
    categoryX: 'Focus',
    options: {
      className: 'pseudo-focus pseudo-focus-visible',
    },
  },
  {
    categoryY: '3rd page',
    categoryX: 'Disabled',
    options: {
      disabled: true,
    },
  },
];

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    ${generateVariantsMatrix(
      variants,
      ({ options: { className, disabled } }) => {
        return html`
          <oryx-pagination max="3">
            <a>1</a>
            <a>2</a>
            <a class=${className} ?disabled=${disabled}>3</a>
            <a>4</a>
            <a>5</a>
            <a>6</a>
            <a>7</a>
          </oryx-pagination>
        `;
      }
    )}
  `;
};

export const States = Template.bind({});
