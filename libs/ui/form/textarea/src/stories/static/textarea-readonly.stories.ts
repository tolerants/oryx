import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import { initMutationObserverForComponent } from '../../../../../utilities';

export default {
  title: `${storybookPrefix}/Form/Textarea/Static`,
} as Meta;

const variations = [
  {
    name: 'Default',
    state: '',
    lightDomState: '',
  },
  {
    name: 'Hovered',
    state: 'pseudo-hover',
    lightDomState: 'pseudo-hover',
  },
  {
    name: 'Focused',
    state: 'pseudo-focus-within',
    lightDomState: 'pseudo-focus-within',
  },
  {
    name: 'Disabled',
    state: '',
    lightDomState: '',
  },
  {
    name: 'Error',
    state: '',
    lightDomState: '',
    errorState: 'Error validation text',
  },
];

const Template: Story = (): TemplateResult => {
  return html`
    <h1>Readonly</h1>
    <div class="input-component">
      ${variations.map((variant) => {
        const isDisabled = variant.name === 'Disabled';
        return html`
          <div class="variation-input-component">
            <div class="variation-input">
              <p>${variant.name}</p>
              <oryx-input errormessage="${variant.errorState}">
                <textarea
                  placeholder="Placeholder"
                  readonly
                  ?disabled=${isDisabled}
                  class="${variant.lightDomState}"
                ></textarea>
              </oryx-input>
            </div>
            <div class="variation-input">
              <oryx-input errormessage="${variant.errorState}">
                <textarea
                  placeholder="Placeholder"
                  readonly
                  ?disabled=${isDisabled}
                  class="${variant.lightDomState}"
                >
Value</textarea
                >
              </oryx-input>
            </div>
          </div>
        `;
      })}
    </div>

    <script>
      ${initMutationObserverForComponent({
        targetComponent: 'oryx-input',
        targetSelector: '.control',
        sourceSelector: 'textarea',
      })};
    </script>

    <style>
      .variation-input-component {
        display: flex;
        align-items: center;
      }

      .variation-input {
        display: flex;
        align-items: center;
      }

      .variation-input {
        display: flex;
        margin-bottom: 20px;
        margin-right: 50px;
        gap: 20px;
        align-items: center;
      }

      .variation-input oryx-input {
        width: 350px;
      }

      .variation-input p {
        width: 100px;
      }
    </style>
  `;
};
export const StatesReadonly = Template.bind({});
