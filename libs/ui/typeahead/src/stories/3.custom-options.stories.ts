import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../constant';
import '../../../popover/index';
import '../index';

export default {
  title: `${storybookPrefix}/Search/Typeahead`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <div class="stories">
      <oryx-typeahead>
        <input value="value" aria-label="label" />
        <oryx-option slot="option">first</oryx-option>
        <oryx-option slot="option">second</oryx-option>
        <oryx-option slot="option">3rd</oryx-option>
      </oryx-typeahead>

      <oryx-typeahead style="--oryx-popover-visible: 1;">
        <input value="value" aria-label="label" />
        <oryx-option slot="option">first</oryx-option>
        <oryx-option slot="option">second</oryx-option>
        <oryx-option slot="option">3rd</oryx-option>
      </oryx-typeahead>
    </div>

    <style>
      .stories {
        display: flex;
        gap: 10px;
      }
      oryx-typeahead {
        flex: 0 0 350px;
      }
    </style>

    <style>
      div[slot='option'] {
        padding: 10px;
        margin: 10px;
        cursor: pointer;
        border-radius: 15px;
      }
      div[slot='option']:hover,
      [highlight] {
        background-color: red;
      }
      [selected]:after {
        content: ' (selected)';
        color: var(--oryx-color-brand);
      }
    </style>
  `;
};

export const CustomOptions = Template.bind({});
