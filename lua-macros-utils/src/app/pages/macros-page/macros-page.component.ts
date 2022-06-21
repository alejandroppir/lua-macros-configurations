import { Component } from '@angular/core';
import { diff_match_patch as DiffMatchPatch } from 'diff-match-patch';

import { LSConstants } from '../../constants/local-storage.constants';
import { LocalStorageService } from '../../services/local-storage.service';
import { ARROWS, CONTROL_BUTTONS, SPECIAL_BUTTONS } from './macros-extra-buttons.constants';

export interface Macro {
  key: {
    keyCode: number;
    key: string;
    code: string;
  };
  label: string;
  value: string;
}

@Component({
  selector: 'app-macros-page',
  templateUrl: './macros-page.component.html',
  styleUrls: ['./macros-page.component.scss'],
})
export class MacrosPageComponent {
  macrosSelectionStart = 0;
  macrosSelectionEnd = 0;

  charModifiers: { key: string; value: boolean; luaTranslate: string }[] = [
    {
      key: 'CONTROL',
      value: false,
      luaTranslate: '^',
    },
    {
      key: 'SHIFT',
      value: false,
      luaTranslate: '+',
    },
    {
      key: 'ALT',
      value: false,
      luaTranslate: '%',
    },
    {
      key: 'WIN',
      value: false,
      luaTranslate: '#',
    },
  ];

  specialButtons = SPECIAL_BUTTONS;
  controlButtons = CONTROL_BUTTONS;
  arrows = ARROWS;

  actualMacro: Macro = { key: { keyCode: 0, key: '', code: '' }, label: '', value: '' };
  actualKeyInput = '';
  macrosList: Macro[] = [];
  keyCombination = '';

  constructor(private _lsService: LocalStorageService) {
    this.macrosList = this._lsService.getFromLS(LSConstants.LS_MACROS_LIST);
    if (!this.macrosList || !Array.isArray(this.macrosList)) {
      this.macrosList = [];
    }
  }

  addMacroToList() {
    if (!this.actualMacro.key || this.actualMacro.key.keyCode === 0 || this.actualMacro.label === '') {
      return;
    }
    this.macrosList = this.macrosList.filter((macro) => macro.key !== this.actualMacro.key);
    this.macrosList.push(this.actualMacro);
    this.clearMacro();
    this.saveMacroLS();
  }

  editMacro(macro: Macro) {
    this.actualMacro = this.macrosList.find((macro) => macro.key.keyCode === macro.key.keyCode) || {
      key: { keyCode: 0, key: '', code: '' },
      label: '',
      value: '',
    };
  }

  deleteMacroToList() {
    this.macrosList = this.macrosList.filter((macro) => macro.key !== this.actualMacro.key);
    this.clearMacro();
    this.saveMacroLS();
  }

  clearMacro() {
    this.actualMacro = { key: { keyCode: 0, key: '', code: '' }, label: '', value: '' };
    this.charModifiers.forEach((modifier) => (modifier.value = false));
    this.keyCombination = '';
  }

  function(): void {}

  saveMacroLS() {
    this._lsService.put(LSConstants.LS_MACROS_LIST, this.macrosList);
  }

  addMacroValue(event: any): void {
    var dmp = new DiffMatchPatch();
    var parsed = dmp.diff_main(this.actualMacro.value, event);
    dmp.diff_cleanupSemantic(parsed);

    let newText = parsed
      .map((segment) => {
        let retStr = '';

        // 0 for equals, 1 for add and -1 for delete
        switch (segment[0]) {
          case 0: // case equals
            retStr = this.inputChangeCaseEq(retStr, segment[1]);
            break;
          case 1: // case add
            retStr = this.inputChangeCaseAdd(segment[1]);
            break;
          case -1: // case delete
            break;

          default:
            break;
        }

        return retStr;
      })
      .join('');
    this.actualMacro.value = newText;
  }

  private inputChangeCaseAdd(value: string): string {
    return value;
    /* TODO - automatizar la inclusion de ctrl y shift - ignorado por ahora
     const checkboxFormatters = this.charModifiers
      .filter((checkbox) => checkbox.value)
      .map((checkbox) => checkbox.luaTranslate)
      .join('');

    return Array.from(value)
      .map((char) => (checkboxFormatters === '' ? char : `(${checkboxFormatters}(${char}))`))
      .join(''); */
  }

  private inputChangeCaseEq(retStr: string, value: string): string {
    return value;
    //  TODO - automatizar la inclusion de ctrl y shift - ignorado por ahora
    //return retStr.match(/[\^+%#]$/) ? retStr.slice(0, -1) : value;
  }

  addSpecialButtonToMacro(button: string): void {
    this.actualMacro.value = `${this.actualMacro.value.substring(0, this.macrosSelectionStart)}${button}${this.actualMacro.value.substring(
      this.macrosSelectionEnd,
    )}`;
    this.macrosSelectionStart = this.macrosSelectionStart + button.length;
    this.macrosSelectionEnd = this.macrosSelectionStart;
  }

  focusOut(event: any): void {
    this.macrosSelectionStart = event.target.selectionStart;
    this.macrosSelectionEnd = event.target.selectionEnd;
  }

  generateKeyCombination(): void {
    const combination = this.charModifiers
      .filter((checkbox) => checkbox.value)
      .map((checkbox) => checkbox.luaTranslate)
      .join('');
    this.keyCombination = `(${combination}(?))`;
  }

  typeMacroKey($event: KeyboardEvent): void {
    this.actualKeyInput = '';
    this.actualMacro.key = { keyCode: $event.keyCode, key: $event.key, code: $event.code };
  }
}
