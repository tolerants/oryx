import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import '../index';

export default {
  title: 'Search',
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <div style="width:300px">
      <oryx-search label="search" searchIcon="close">
        <input placeholder="Search..." />
      </oryx-search>
    </div>
  `;
};
export const CustomIcon = Template.bind({});
