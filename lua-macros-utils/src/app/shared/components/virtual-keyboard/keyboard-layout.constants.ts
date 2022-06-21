export const BASIC_LAYOUT = {
 default: [
  '{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
  '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
  '{tab} q w e r t y u i o p [ ] \\',
  "{capslock} a s d f g h j k l ; ' {enter}",
  '{shiftleft} z x c v b n m , . / {shiftright}',
  '{controlleft} {altleft} {metaleft} {space} {metaright} {altright}',
 ],
 shift: [
  '{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
  '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
  '{tab} Q W E R T Y U I O P { } |',
  '{capslock} A S D F G H J K L : " {enter}',
  '{shiftleft} Z X C V B N M < > ? {shiftright}',
  '{controlleft} {altleft} {metaleft} {space} {metaright} {altright}',
 ],
};
export const KEYBOARD_CONTROL_PANEL = [
 '{prtscr} {scrolllock} {pause}',
 '{insert} {home} {pageup}',
 '{delete} {end} {pagedown}',
];
export const KEYBOARD_ARROW_PANEL = ['{arrowup}', '{arrowleft} {arrowdown} {arrowright}'];
export const KEYBOARD_NUMPAD_PANEL = [
 '{numlock} {numpaddivide} {numpadmultiply}',
 '{numpad7} {numpad8} {numpad9}',
 '{numpad4} {numpad5} {numpad6}',
 '{numpad1} {numpad2} {numpad3}',
 '{numpad0} {numpaddecimal}',
];
export const KEYBOARD_NUMPAD_END_PANEL = ['{numpadsubtract}', '{numpadadd}', '{numpadenter}'];

export const KEYBOARD_DISPLAY_SYMBOLS = {
 '{escape}': 'esc ⎋',
 '{tab}': 'tab ⇥',
 '{backspace}': 'backspace ⌫',
 '{enter}': 'enter ↵',
 '{capslock}': 'caps lock ⇪',
 '{shiftleft}': 'shift ⇧',
 '{shiftright}': 'shift ⇧',
 '{controlleft}': 'ctrl ⌃',
 '{controlright}': 'ctrl ⌃',
 '{altleft}': 'alt ⌥',
 '{altright}': 'alt ⌥',
 '{metaleft}': 'cmd ⌘',
 '{metaright}': 'cmd ⌘',
};
