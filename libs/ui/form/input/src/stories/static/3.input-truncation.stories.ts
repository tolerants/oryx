import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import { initMutationObserverForComponent } from '../../../../../utilities';
import '../../form-control';

export default {
  title: `${storybookPrefix}/Form/Input/static`,
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
    <h1>Input truncation</h1>
    <div class="input-component">
      ${variations.map((variant) => {
        const isDisabled = variant.name === 'Disabled';
        return html`
          <div class="variation-input">
            <p>${variant.name}</p>
            <oryx-input errormessage="${variant.errorState}">
              <input
                placeholder="Placeholder"
                value="Long text inputasd"
                ?disabled=${isDisabled}
                class="${variant.lightDomState}"
              />
            </oryx-input>
          </div>
        `;
      })}
    </div>

    <script>
      ${initMutationObserverForComponent({
        targetComponent: 'oryx-input',
        targetSelector: '.control',
        sourceSelector: 'input',
      })};
    </script>

    <style>
      .variation-input {
        display: flex;
        margin-bottom: 20px;
        gap: 20px;
        align-items: center;
      }

      .variation-input oryx-input {
        width: 150px;
      }

      .variation-input p {
        width: 100px;
      }

      oryx-input input {
        text-overflow: ellipsis;
      }
    </style>
  `;
};
export const InputTruncation = Template.bind({});
