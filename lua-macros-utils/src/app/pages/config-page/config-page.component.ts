import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { LSConstants } from './../../constants/local-storage.constants';
import { LocalStorageService } from './../../services/local-storage.service';
import { UtilsService } from './../../shared/services/utils.service';
import { CheckboxConfigurations, CoreTableColsSchema, CustomTableColsSchema } from './config-page-vars';
import {
  CheckboxConfig,
  CheckboxConfigName,
  CustomVariable,
  CustomVariableTypesAdmitted,
  DataTypes,
} from './config.constants';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss'],
})
export class ConfigPageComponent {
  customVariablesEnabler = false; // TODO - por ahora no se van a usar las variables propias, quedan deshabilitadas

  checkboxArray = CheckboxConfigurations;
  someExtraData = false;

  checkboxExtraDataFG = new FormGroup({});

  get checkboxConfigName(): typeof CheckboxConfigName {
    return CheckboxConfigName;
  }
  get variableTypes(): typeof CustomVariableTypesAdmitted {
    return CustomVariableTypesAdmitted;
  }
  get variableTypesArray(): string[] {
    return Object.entries(CustomVariableTypesAdmitted).map(([value]) => value);
  }
  get selectValuesByColumn(): Map<string, string[]> {
    return new Map([['type', this.variableTypesArray]]);
  }
  get coreTableColsSchema(): typeof CoreTableColsSchema {
    return CoreTableColsSchema;
  }
  get customTableColsSchema(): typeof CustomTableColsSchema {
    return CustomTableColsSchema;
  }

  coreVarsDataSource = new MatTableDataSource<CustomVariable>([]);
  customVarsDataSource = new MatTableDataSource<CustomVariable>([]);

  constructor(private _lsService: LocalStorageService, private formBuilder: FormBuilder, private utilsService: UtilsService) {
    this.coreVarsDataSource.data = this._lsService.getFromLS(LSConstants.LS_CORE_VARIABLES);
    this.customVarsDataSource.data = this._lsService.getFromLS(LSConstants.LS_CUSTOM_VARIABLES);

    const lsCheckboxes: CheckboxConfig[] = this._lsService.getFromLS(LSConstants.LS_CHECKBOX_CONFIGS);
    if (lsCheckboxes && lsCheckboxes.length > 0) {
      lsCheckboxes?.forEach((lsCheckbox) => {
        const checkbox = this.checkboxArray.find((cArray) => cArray.title === lsCheckbox.title);
        if (checkbox) {
          checkbox.value = lsCheckbox.value;
          checkbox.extraInfo = lsCheckbox.extraInfo;
        }
      });
    }

    this.initializeExtraDataFields();
  }

  initializeExtraDataFields(): void {
    this.checkboxArray
      .filter((checkboxElement) => checkboxElement.extraInfoNeeded)
      .forEach((checkboxElement) => {
        if (
          this.coreVarsDataSource.data &&
          checkboxElement.title !== CheckboxConfigName.ADD_KEYBOARD &&
          checkboxElement.title !== CheckboxConfigName.ADD_SCRIPT
        ) {
          // table data not empty
          const actualValueInTable = this.coreVarsDataSource.data.find(
            (dataRow) => dataRow.description === this.utilsService.translate(checkboxElement.title),
          );
          if (actualValueInTable && actualValueInTable.value !== checkboxElement.extraInfo) {
            this.coreVarsDataSource.data = this.coreVarsDataSource.data.filter(
              (d) => d.description !== this.utilsService.translate(checkboxElement.title),
            );
            this.checkboxValueChange(checkboxElement);
          }
        } else {
          this.checkboxValueChange(checkboxElement);
        }
      });
    this.hasSomeExtraData();
  }

  addRow(tableData: MatTableDataSource<CustomVariable>, newDataRow?: CustomVariable) {
    const newRow: CustomVariable = newDataRow
      ? newDataRow
      : {
          id: new Date().getTime().toString(),
          description: '',
          value: '',
          type: this.variableTypes.UNDEFINED,
          isEdit: true,
        };
    return (tableData.data = [newRow, ...tableData.data]);
  }

  saveCheckboxDataChanged(): void {
    if (!this.checkboxExtraDataFG.valid) {
      this.utilsService.showSnackBar(this.utilsService.translate('FORM_NOT_VALID'));
      return;
    }
    this.checkboxArray
      .filter((checkboxElement) => checkboxElement.extraInfoNeeded)
      .forEach((checkboxElement) => {
        if (DataTypes.STRING === checkboxElement.extraInfoType) {
          if (!this.checkboxExtraDataFG.contains(checkboxElement.title)) {
            delete checkboxElement.extraInfo;
          } else {
            checkboxElement.extraInfo = this.checkboxExtraDataFG.get(checkboxElement.title)?.value;
          }
        }
      });
    this._lsService.put(LSConstants.LS_CHECKBOX_CONFIGS, this.checkboxArray);
  }

  checkboxValueChange(checkbox: CheckboxConfig): void {
    if (checkbox.extraInfoNeeded && checkbox.value) {
      if (DataTypes.STRING === checkbox.extraInfoType) {
        this.checkboxExtraDataFG.addControl(checkbox.title, this.formBuilder.control(checkbox.extraInfo, [Validators.required]));
      } else if (DataTypes.BOOLEAN === checkbox.extraInfoType) {
        const newRow: CustomVariable = {
          id: checkbox.title,
          description: this.utilsService.translate(checkbox.title),
          value: checkbox.value.toString(),
          type: this.variableTypes.BOOLEAN,
          isEdit: false,
        };
        this.addRow(this.coreVarsDataSource, newRow);
      }
    } else {
      this.checkboxExtraDataFG.removeControl(checkbox.title);
      this.coreVarsDataSource.data = this.coreVarsDataSource.data.filter((d) => d.description !== this.utilsService.translate(checkbox.title));
    }
    this.saveCoreTableDataChanged();
    this.hasSomeExtraData();
  }

  saveCoreTableDataChanged(): void {
    this._lsService.put(LSConstants.LS_CORE_VARIABLES, this.coreVarsDataSource.data);
  }
  saveCustomTableDataChanged(): void {
    this._lsService.put(LSConstants.LS_CUSTOM_VARIABLES, this.customVarsDataSource.data);
  }

  hasSomeExtraData(): void {
    this.someExtraData =
      this.checkboxArray.filter(
        (checkBoxElement) => checkBoxElement.extraInfoNeeded && DataTypes.STRING === checkBoxElement.extraInfoType && checkBoxElement.value,
      ).length > 0;
  }

  openKeyboardIdHelp(): void {
    window.open('https://github.com/alejandroppir/lua-macros-configurations#keyboard-id');
  }
}
