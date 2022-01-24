import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import '../../index';

export default {
  title: 'form/form-control',
} as Meta;

interface Props {
  label: string;
  required: boolean;
  disabled: boolean;
}

const Template: Story<Props> = ({
  label,
  required,
  disabled,
}: Props): TemplateResult => {
  return html` <oryx-input label="${label}">
    <input
      placeholder="placeholder..."
      ?required=${required}
      ?disabled=${disabled}
    />
  </oryx-input>`;
};
export const Required = Template.bind({});

Required.args = {
  label: 'label',
  required: true,
  disabled: false,
};
