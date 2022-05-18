import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import '../../../../../option/src';
import { sideBySide } from '../../../../../utilities/storybook';
import '../../index';

export default {
  title: `${storybookPrefix}/Form/Select/Static`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  const selectOptions = ['Red', 'Green', 'Blue'];

  return sideBySide(html`
    <oryx-select ?allowEmptyValue=${true} label="with placeholer option">
      <select required>
        <option value="" hidden>Select an option</option>
        ${selectOptions.map((state) => html`<option>${state}</option>`)}
      </select>
    </oryx-select>
  `);
};

export const PlaceholderOption = Template.bind({});
