import { expect, fixture, html } from '@open-wc/testing';
import { svg } from 'lit';
import { IconComponent } from './icon.component';
import './index';
import { icon, IconSize } from './index';

describe('factory', () => {
  let element: IconComponent;

  describe('when an icon type is given', () => {
    beforeEach(async () => {
      element = await fixture(html`${icon({ type: 'close' })}`);
    });

    it('should create an instance of icon component', () => {
      expect(element instanceof IconComponent).to.be.true;
    });

    it('should have icon type', () => {
      expect(element.getAttribute('type')).to.eq('close');
    });

    it('should use the default icon sprite', () => {
      expect(
        element.shadowRoot
          ?.querySelector('svg use')
          ?.getAttribute('href')
          ?.startsWith('assets/icons.svg')
      ).to.be.true;
    });
  });

  describe('when an icon size is given', () => {
    beforeEach(async () => {
      element = await fixture(html`${icon({ size: IconSize.MEDIUM })}`);
    });

    it('should have a medium size', () => {
      expect(element.getAttribute('size')).to.eq('medium');
    });
  });

  describe('when an custom icon sprite is given', () => {
    beforeEach(async () => {
      element = await fixture(
        html`${icon({ type: 'close', sprite: '/foo/bar.svg' })}`
      );
    });

    it('should use the custom sprite', () => {
      expect(
        element.shadowRoot
          ?.querySelector('svg use')
          ?.getAttribute('href')
          ?.startsWith('/foo/bar.svg')
      ).to.be.true;
    });
  });

  describe('when a custom source is given', () => {
    beforeEach(async () => {
      element = await fixture(
        html`${icon({
          source: svg`<circle cx="12" cy="12" r="12" />`,
        })}`
      );
    });

    it('should render the custom SVG source', () => {
      expect(element.querySelector('svg circle')).to.exist;
    });
  });
});
