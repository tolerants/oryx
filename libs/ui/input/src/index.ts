export * from './affix';
export * from './error';
export * from './form-control';
export * from './input.component';
export * from './label';

import { InputComponent } from './input.component';

customElements.get('oryx-input') ||
  customElements.define('oryx-input', InputComponent);
