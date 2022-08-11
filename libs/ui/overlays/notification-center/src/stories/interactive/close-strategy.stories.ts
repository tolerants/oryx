import { wait } from '@spryker-oryx/typescript-utils';
import { expect } from '@storybook/jest';
import { userEvent } from '@storybook/testing-library';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import { NotificationCenterComponent, TAG_NAME } from '../../index';

import { Positions } from '../../notification-center.model';
import { getNotification, open } from './util';

export default {
  title: `${storybookPrefix}/Overlays/Notification Center/Interactive`,
} as Meta;

const Template: Story = (): TemplateResult => {
  return html`
    <oryx-notification-center position=${Positions.TOP_END}>
    </oryx-notification-center>
  `;
};

export const CloseStrategy = Template.bind({});

CloseStrategy.play = async (obj: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  const center = obj.canvasElement.querySelector(
    TAG_NAME
  ) as NotificationCenterComponent;

  open({ autoClose: false });
  await wait(0);
  expect(getNotification(center)).toBeDefined;
  await wait(1000);
  userEvent.click(
    getNotification(center)?.renderRoot?.querySelector('button') as Element
  );
  await wait(0);
  expect(getNotification(center)).toBeNull;
};
