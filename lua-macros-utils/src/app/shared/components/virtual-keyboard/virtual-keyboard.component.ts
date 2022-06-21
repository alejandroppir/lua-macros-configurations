import { Component } from '@angular/core';
import Keyboard from 'simple-keyboard';

import {
 BASIC_LAYOUT,
 KEYBOARD_ARROW_PANEL,
 KEYBOARD_CONTROL_PANEL,
 KEYBOARD_DISPLAY_SYMBOLS,
 KEYBOARD_NUMPAD_END_PANEL,
 KEYBOARD_NUMPAD_PANEL,
} from './keyboard-layout.constants';

@Component({
 selector: 'app-virtual-keyboard',
 templateUrl: './virtual-keyboard.component.html',
 styleUrls: ['./virtual-keyboard.component.scss'],
})
export class VirtualKeyboardComponent {
 value = '';
 commonKeyboardOptions = {
  onChange: (input: string) => this.onChange(input),
  onKeyPress: (button: string) => this.onKeyPress(button),
  theme: 'simple-keyboard hg-theme-default hg-layout-default',
  physicalKeyboardHighlight: true,
  syncInstanceInputs: true,
  mergeDisplay: true,
  debug: true,
 };
 keyboard!: Keyboard;
 keyboardControlPad!: Keyboard;
 keyboardArrows!: Keyboard;
 keyboardNumPad!: Keyboard;
 keyboardNumPadEnd!: Keyboard;

 ngAfterViewInit() {
  this.keyboard = new Keyboard('.simple-keyboard-main', {
   ...this.commonKeyboardOptions,
   /**
    * Layout by:
    * Sterling Butters (https://github.com/SterlingButters)
    */
   layout: BASIC_LAYOUT,
   display: KEYBOARD_DISPLAY_SYMBOLS,
  });

  this.keyboardControlPad = new Keyboard('.simple-keyboard-control', {
   ...this.commonKeyboardOptions,
   layout: {
    default: KEYBOARD_CONTROL_PANEL,
   },
  });

  this.keyboardArrows = new Keyboard('.simple-keyboard-arrows', {
   ...this.commonKeyboardOptions,
   layout: {
    default: KEYBOARD_ARROW_PANEL,
   },
  });

  this.keyboardNumPad = new Keyboard('.simple-keyboard-numpad', {
   ...this.commonKeyboardOptions,
   layout: {
    default: KEYBOARD_NUMPAD_PANEL,
   },
  });

  this.keyboardNumPadEnd = new Keyboard('.simple-keyboard-numpadEnd', {
   ...this.commonKeyboardOptions,
   layout: {
    default: KEYBOARD_NUMPAD_END_PANEL,
   },
  });
 }

 onChange(input: string): void {
  this.value = input;
  console.log('Input changed', input);
 }

 onKeyPress(button: string): void {
  console.log('Button pressed', button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === '{shift}' || button === '{shiftleft}' || button === '{shiftright}' || button === '{capslock}')
   this.handleShift();
 }

 onInputChange(event: any): void {
  this.keyboard.setInput(event.target.value);
 }

 handleShift(): void {
  let currentLayout = this.keyboard.options.layoutName;
  let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

  this.keyboard.setOptions({
   layoutName: shiftToggle,
  });
 }
}
