import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../../../.constants';
import '../../index';
import { input, InputListDecorator, inputs, UxType } from '../util';

export default {
  title: `${storybookPrefix}/Form/Input List/Static`,
  decorators: [InputListDecorator()],
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    ${Object.keys(UxType).map(
      (type) => html`
        <oryx-input-list heading=${type} errorMessage="Error validation text">
          ${inputs.map((item) => {
            switch (type) {
              case 'radio':
                return html`<oryx-radio>${input(item)}</oryx-radio>`;
              case 'toggle':
                return html`<oryx-toggle>${input(item)}</oryx-toggle>`;
              case 'toggle-icon':
                return html`<oryx-toggle-icon
                  >${input(item, false)}<oryx-icon type=${item}></oryx-icon
                ></oryx-toggle-icon>`;
              case 'toggle-button':
                return html`<oryx-toggle-icon
                  >${input(item, false)}<oryx-icon type=${item}></oryx-icon>
                  <span>${item}</span>
                </oryx-toggle-icon>`;
              default:
                return html`<oryx-checkbox>${input(item)}</oryx-checkbox>`;
            }
          })}
        </oryx-input-list>
      `
    )}
  `;
};

export const ErrorMessage = Template.bind({});
