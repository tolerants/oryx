import { fixture, html } from '@open-wc/testing-helpers';
import '@spryker-oryx/testing';
import { LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SpyInstance } from 'vitest';
import {
  PopoverComponent,
  PopoverController,
  PopoverSelectEvent,
  SelectedController,
} from '.';
import { a11yConfig } from '../../a11y';
import { getControl } from '../../form/utilities/getControl';
import '../../option';
import { OptionComponent } from '../../option';

/** scrollIntoView is not implemented in jsdom */
Element.prototype.scrollIntoView = vi.fn();

class CustomPopoverController extends PopoverController {
  selectedController = new SelectedController(this.host, 'oryx-option');
}
@customElement('fake-popover')
class FakeComponent extends LitElement {
  controller = new CustomPopoverController(this);

  render(): TemplateResult {
    return html`
      <oryx-popover>
        <slot></slot>
      </oryx-popover>
    `;
  }
}
@customElement('fake-without-focus')
class FakeWithoutFocusComponent extends LitElement {
  controller = new CustomPopoverController(this, { showOnFocus: false });
  render(): TemplateResult {
    return html`
      <oryx-popover>
        <slot></slot>
      </oryx-popover>
    `;
  }
}

@customElement('no-popover')
class NoPopoverComponent extends FakeComponent {
  render(): TemplateResult {
    return html`no popover`;
  }
}

describe('PopoverController', () => {
  let element: FakeComponent | FakeWithoutFocusComponent | NoPopoverComponent;

  const popover = (): PopoverComponent | null => {
    return element.renderRoot?.querySelector('oryx-popover');
  };

  describe('handleKeydown', () => {
    describe('when the popover is open', () => {
      beforeEach(async () => {
        element = await fixture(html`<fake-popover show>
          <input placeholder="a11y" />
          ${[...Array(25)].map(
            (_, index) => html`<oryx-option>${index + 1}</oryx-option>`
          )}
        </fake-popover>`);
        element.querySelector('input')?.focus();
        popover()?.toggleAttribute('show', true);
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      describe('and an element is highlighted', () => {
        let highlightedItem: HTMLElement;

        beforeEach(() => {
          highlightedItem =
            element.querySelectorAll<HTMLElement>('oryx-option')?.[5];
          highlightedItem?.toggleAttribute('highlight', true);
        });

        it('passes the a11y audit', async () => {
          await expect(element).shadowDom.to.be.accessible(a11yConfig);
        });

        describe('and the "Enter" key is dispatched', () => {
          beforeEach(() => {
            element.dispatchEvent(
              new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
            );
          });

          it('should select the highlighted element', () => {
            expect(highlightedItem.hasAttribute('selected')).toBe(true);
          });
        });

        describe('and the " " key is dispatched', () => {
          let expectation: SpyInstance;

          describe('and the control is readonly', () => {
            beforeEach(() => {
              getControl(element).toggleAttribute('readonly', true);
              const event = new KeyboardEvent('keydown', {
                key: ' ',
                bubbles: true,
              } as KeyboardEventInit);
              expectation = vi.spyOn(event, 'preventDefault');
              getControl(element).dispatchEvent(event);
            });

            it('should select the highlighted element', () => {
              expect(highlightedItem.hasAttribute('selected')).toBe(true);
              expect(expectation).toHaveBeenCalledOnce();
            });
          });

          describe('and the control is not readonly', () => {
            beforeEach(() => {
              getControl(element).toggleAttribute('readonly', false);
            });

            describe('and the " " key is dispatched', () => {
              let expectation: SpyInstance;

              beforeEach(() => {
                const event = new KeyboardEvent('keydown', {
                  key: ' ',
                  bubbles: true,
                });
                expectation = vi.spyOn(event, 'preventDefault');
                element.dispatchEvent(event);
              });

              it('should not select the highlighted element', () => {
                expect(highlightedItem.hasAttribute('selected')).toBe(false);
                expect(expectation).not.toHaveBeenCalled();
              });
            });
          });
        });
      });
    });
  });

  describe('handleInput', () => {
    describe('when the input event is dispatched', () => {
      let input: HTMLInputElement | null;
      beforeEach(async () => {
        element = await fixture(html`<fake-popover>
          <input value="value" />
        </fake-popover>`);

        input = element.querySelector('input');
        input?.dispatchEvent(
          new InputEvent('input', { bubbles: true, inputType: 'insertText' })
        );
      });

      it('should show the popover', () => {
        expect(
          element.renderRoot.querySelector('oryx-popover')?.hasAttribute('show')
        ).toBe(true);
      });
    });

    describe('when an artificial input event is dispatched', () => {
      let input: HTMLInputElement | null;
      beforeEach(async () => {
        element = await fixture(html`<fake-popover>
          <input value="value" />
        </fake-popover>`);

        input = element.querySelector('input');
        input?.dispatchEvent(new InputEvent('input', { bubbles: true }));
      });

      it('should not show the popover', () => {
        expect(
          element.renderRoot.querySelector('oryx-popover')?.hasAttribute('show')
        ).toBe(false);
      });
    });
  });

  describe('when oryx.popover event is dispatched', () => {
    let selectSpy: SpyInstance;
    let deselectSpy: SpyInstance;

    beforeEach(async () => {
      element = await fixture(html`<fake-popover>
        <input placeholder="a11y" />
        ${[...Array(5)].map(
          (_, index) => html`<oryx-option>${index + 1}</oryx-option>`
        )}
      </fake-popover>`);

      selectSpy = vi.spyOn(element.controller.selectedController, 'select');
      deselectSpy = vi.spyOn(element.controller.selectedController, 'deselect');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    describe('and there is no selected element', () => {
      beforeEach(async () => {
        element?.dispatchEvent(
          new CustomEvent<PopoverSelectEvent>('oryx.popover', {
            bubbles: true,
            composed: true,
            detail: { selected: undefined },
          })
        );
      });

      it('should deselect the selected element', () => {
        expect(deselectSpy).toHaveBeenCalled();
      });
    });

    describe('and there is a selected element', () => {
      beforeEach(async () => {
        element?.dispatchEvent(
          new CustomEvent<PopoverSelectEvent>('oryx.popover', {
            bubbles: true,
            composed: true,
            detail: { selected: {} as HTMLElement },
          })
        );
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should select the selected element', () => {
        expect(selectSpy).toHaveBeenCalled();
      });
    });
  });

  describe('handleChange', () => {
    const expectChangeEvent = (): void => {
      it('should not throw an error', () => {
        popover()?.dispatchEvent(
          new Event('change', { bubbles: true, composed: true })
        );
        expect(() => {
          (): void => undefined;
        }).not.toThrow();
      });
    };

    describe('when a change event is dispatched', () => {
      describe('with items', () => {
        beforeEach(async () => {
          element = await fixture(html`<fake-popover>
            <input value="first" />
            <oryx-option value="first">first</oryx-option>
            <oryx-option>second</oryx-option>
          </fake-popover>`);
        });
        expectChangeEvent();
      });

      describe('without items', () => {
        beforeEach(async () => {
          element = await fixture(html`<fake-popover>
            <input value="value" />
          </fake-popover>`);
        });

        expectChangeEvent();
      });
    });
  });

  describe('with popover', () => {
    beforeEach(async () => {
      element = await fixture(html`<fake-popover>
        ${[...Array(25)].map(
          (_, index) => html`<oryx-option>${index + 1}</oryx-option>`
        )}
      </fake-popover>`);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible(a11yConfig);
    });

    describe('scrollIntoView', () => {
      let option: OptionComponent | null;

      beforeEach(async () => {
        element = await fixture(html`<fake-popover>
          <oryx-option>first</oryx-option>
          <oryx-option selected highlight>second</oryx-option>
        </fake-popover>`);
        option = element.querySelector('oryx-option[selected]');
      });

      describe('when an item is selected', () => {
        beforeEach(async () => {
          element.dispatchEvent(
            new InputEvent('input', {
              bubbles: true,
              composed: true,
              inputType: 'insertText',
            })
          );
        });

        it('should not trigger scrollIntoView when the popup is shown', () => {
          expect(option?.scrollIntoView).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when the focus is not required', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<fake-without-focus><input /></fake-without-focus>`
      );
    });
    it('should not throw an error', () => {
      popover()?.dispatchEvent(
        new Event('change', { bubbles: true, composed: true })
      );
      expect(() => {
        (): void => undefined;
      }).not.toThrow();
    });
  });

  describe('selectByValue()', () => {
    beforeEach(async () => {
      element = await fixture(html`<fake-popover show>
        <input placeholder="a11y" />
        ${['foo', 'bar'].map(
          (value) => html`<oryx-option>${value}</oryx-option>`
        )}
      </fake-popover>`);
    });

    describe('when there is an option with the given value', () => {
      beforeEach(() => {
        element.controller.selectByValue('bar');
      });
      it('should select the option', () => {
        expect(
          element.querySelector<OptionComponent>('oryx-option[selected]')?.value
        ).toBe('bar');
      });
    });

    describe('when there is no option with the given value', () => {
      beforeEach(() => {
        element.controller.selectByValue('foo nor bar');
      });
      it('should not throw an error', () => {
        expect(() => {
          (): void => undefined;
        }).not.toThrow();
      });
    });
  });
});
