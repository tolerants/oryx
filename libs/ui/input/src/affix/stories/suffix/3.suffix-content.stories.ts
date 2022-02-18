import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../constant';
import '../../index';

export default {
  title: `${storybookPrefix}/form/form-control/suffix`,
} as Meta;
interface Props {
  suffixFill: boolean;
  disabled: boolean;
}

const Template: Story<Props> = ({
  suffixFill,
  disabled,
}: Props): TemplateResult => {
  return html`
<oryx-input .options=${{ suffixFill }}>
  <input placeholder="Placeholder..." ?disabled=${disabled}></input>
  <oryx-icon slot="suffix" type="search"></oryx-icon>
  <span slot="suffix">more...</span>
</oryx-input>
      `;
};
export const SuffixContent = Template.bind({});
SuffixContent.args = {
  suffixFill: true,
  disabled: false,
} as Props;
