import { useComponent } from '@spryker-oryx/core/utilities';
import { navigationItemComponent } from '@spryker-oryx/ui/navigation-item';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.constants';
import { navigationComponent } from '../index';

useComponent([navigationComponent, navigationItemComponent]);

export default {
  title: `${storybookPrefix}/Navigations/Navigation`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <div style="height:500px">
      <oryx-navigation>
        <a href="">
          <oryx-navigation-item active>
            <oryx-icon slot="icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M20.6598 0.380021C21.5851 0.67218 22.4006 1.2368 22.9998 2.00002C23.8298 3.42002 24.9098 6.46002 20.6398 11.39C20.6398 11.39 15.7298 16.63 9.72978 18.99C9.39181 19.1229 9.02233 19.1539 8.66693 19.0793C8.31153 19.0047 7.98575 18.8276 7.72978 18.57L5.15978 16C4.90267 15.7436 4.72815 15.4161 4.65865 15.0597C4.58915 14.7033 4.62785 14.3343 4.76978 14C6.35715 10.2861 8.61479 6.8963 11.4298 4.00002C15.5998 -0.299979 18.6398 -0.409979 20.6598 0.380021ZM15.6442 8.93881C16.0454 9.20692 16.5172 9.35002 16.9998 9.35002C17.3206 9.35134 17.6385 9.28913 17.9351 9.16698C18.2317 9.04483 18.5012 8.86515 18.7281 8.63831C18.9549 8.41147 19.1346 8.14196 19.2567 7.84533C19.3789 7.5487 19.4411 7.23082 19.4398 6.91002C19.4398 6.42743 19.2967 5.95569 19.0286 5.55443C18.7605 5.15317 18.3794 4.84043 17.9335 4.65576C17.4877 4.47108 16.9971 4.42276 16.5238 4.5169C16.0504 4.61105 15.6157 4.84344 15.2744 5.18468C14.9332 5.52592 14.7008 5.96069 14.6067 6.434C14.5125 6.90731 14.5608 7.39792 14.7455 7.84377C14.9302 8.28962 15.2429 8.6707 15.6442 8.93881ZM5.07967 11.0201C4.78967 11.5201 4.57967 11.9101 4.39967 12.2801C4.38272 12.3156 4.35872 12.3473 4.32914 12.3732C4.29956 12.3992 4.265 12.4188 4.22758 12.431C4.19016 12.4431 4.15066 12.4476 4.11148 12.444C4.07229 12.4404 4.03425 12.4288 3.99967 12.4101L0.569668 11.2301C0.435003 11.2101 0.309421 11.1502 0.209178 11.0581C0.108935 10.966 0.0386448 10.846 0.00740494 10.7135C-0.0238349 10.581 -0.0145861 10.4421 0.0339543 10.3149C0.0824948 10.1878 0.168092 10.0781 0.279668 10.0001L1.56967 8.74008L3.29967 7.00008C3.43421 6.88194 3.59648 6.7998 3.77134 6.76133C3.94621 6.72286 4.12797 6.72931 4.29967 6.78008L6.89967 7.64008C6.9297 7.64676 6.95752 7.66102 6.98047 7.68151C7.00343 7.702 7.02074 7.72803 7.03077 7.75711C7.0408 7.7862 7.04321 7.81737 7.03776 7.84765C7.03232 7.87793 7.0192 7.90631 6.99967 7.93008C6.30159 8.92284 5.66055 9.9545 5.07967 11.0201ZM4.05744 16.5976C4.17311 16.6443 4.2742 16.721 4.35024 16.8199L7.52024 19.9999C7.60605 20.0809 7.67033 20.182 7.70727 20.2941C7.7442 20.4061 7.75263 20.5256 7.73179 20.6418C7.71094 20.7579 7.66148 20.867 7.58788 20.9592C7.51428 21.0514 7.41886 21.1239 7.31024 21.1699C7.31024 21.1699 4.53024 22.5599 3.14024 21.1699C1.75024 19.7799 3.14024 16.9999 3.14024 16.9999C3.1842 16.8832 3.25857 16.7803 3.35563 16.702C3.4527 16.6236 3.56894 16.5726 3.69233 16.5542C3.81572 16.5359 3.94177 16.5508 4.05744 16.5976ZM16.7504 16.43C16.7405 16.3997 16.7231 16.3723 16.6998 16.3505C16.6766 16.3287 16.6482 16.3131 16.6173 16.3051C16.5864 16.2971 16.554 16.2971 16.5231 16.3049C16.4922 16.3127 16.4638 16.3282 16.4404 16.35C15.3104 17.19 14.2604 17.9 13.4404 18.35L12.2304 19.08C12.1708 19.1185 12.1256 19.1757 12.1021 19.2427C12.0785 19.3097 12.078 19.3826 12.1004 19.45L13.4404 22.86C13.4665 22.9957 13.5327 23.1205 13.6305 23.2182C13.7283 23.3158 13.8531 23.3819 13.9889 23.4077C14.1247 23.4336 14.2651 23.4181 14.392 23.3632C14.5188 23.3083 14.6263 23.2166 14.7004 23.1L15.9304 21.74L17.5604 20C17.6686 19.86 17.7414 19.6961 17.7728 19.522C17.8041 19.3479 17.793 19.1688 17.7404 19L16.7504 16.43Z"
                />
              </svg>
            </oryx-icon>
            Launchpad
          </oryx-navigation-item>
        </a>

        <oryx-navigation-item @click=${console.log}>
          <oryx-icon slot="icon">
            <svg viewBox="0 0 24 24">
              <path
                d="M20.9688 1H2.73651C1.78119 0.999986 1.00529 1.78215 1.0001 2.75043V4.82609C0.995061 5.29617 1.17578 5.74877 1.50196 6.08298C1.82815 6.41719 2.2727 6.60525 2.73651 6.60522H20.9688C21.4326 6.60525 21.8772 6.41719 22.2034 6.08298C22.5296 5.74877 22.7103 5.29617 22.7052 4.82609V2.75043C22.7 1.78215 21.9241 0.999986 20.9688 1Z"
              />
              <path
                d="M8.00237 8.42261H2.73651C1.77752 8.42261 1.0001 9.21059 1.0001 10.1826V21.2496C1.00529 22.2178 1.78119 23 2.73651 23H8.00237C8.95769 23 9.73358 22.2178 9.73878 21.2496V10.1826C9.73878 9.21059 8.96136 8.42261 8.00237 8.42261Z"
              />
              <path
                d="M12.7586 10.5652H21.7615C22.1507 10.4356 22.5779 10.5752 22.819 10.9108C23.0602 11.2464 23.0602 11.7014 22.819 12.037C22.5779 12.3726 22.1507 12.5123 21.7615 12.3826H12.7586C12.3695 12.5123 11.9423 12.3726 11.7011 12.037C11.46 11.7014 11.46 11.2464 11.7011 10.9108C11.9423 10.5752 12.3695 10.4356 12.7586 10.5652Z"
              />
              <path
                d="M21.7615 14.8026H12.7586C12.3695 14.673 11.9423 14.8126 11.7011 15.1482C11.46 15.4838 11.46 15.9388 11.7011 16.2744C11.9423 16.61 12.3695 16.7496 12.7586 16.62H21.7615C22.1507 16.7496 22.5779 16.61 22.819 16.2744C23.0602 15.9388 23.0602 15.4838 22.819 15.1482C22.5779 14.8126 22.1507 14.673 21.7615 14.8026Z"
              />
              <path
                d="M12.7586 19.0496H21.7615C22.1507 18.9199 22.5779 19.0595 22.819 19.3952C23.0602 19.7308 23.0602 20.1857 22.819 20.5214C22.5779 20.857 22.1507 20.9966 21.7615 20.867H12.7586C12.3695 20.9966 11.9423 20.857 11.7011 20.5214C11.46 20.1857 11.46 19.7308 11.7011 19.3952C11.9423 19.0595 12.3695 18.9199 12.7586 19.0496Z"
              />
            </svg>
          </oryx-icon>

          test
        </oryx-navigation-item>
      </oryx-navigation>
    </div>
  `;
};
export const NavigationDemo = Template.bind({});
