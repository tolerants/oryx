import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';

export default {
  title: `${storybookPrefix}/Structure/Card/Static/Primary`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <oryx-card>
      <h5 slot="header">header</h5>
      <div>content slot</div>
      <div slot="footer">footer slot</div>
    </oryx-card>
  `;
};

export const HeaderSlot = Template.bind({});
