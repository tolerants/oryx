import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import { sideBySide, states } from '../../../../../utilities/storybook';

export default {
  title: `${storybookPrefix}/Form/Select/Static`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return sideBySide(html`
    <oryx-select>
      <input placeholder="select something from the list" />
      ${states.map((state) => html`<oryx-option>${state}</oryx-option>`)}
    </oryx-select>
  `);
};

export const InputBased = Template.bind({});
