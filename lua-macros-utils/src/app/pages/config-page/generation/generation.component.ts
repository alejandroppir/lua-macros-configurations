import { Component } from '@angular/core';
import { MonacoStandaloneDiffEditor } from '@materia-ui/ngx-monaco-editor';

import { Macro } from '../../macros-page/macros-page.component';
import { LSConstants } from './../../../constants/local-storage.constants';
import { LocalStorageService } from './../../../services/local-storage.service';
import { UtilsService } from './../../../shared/services/utils.service';
import {
  CheckboxConfig,
  CheckboxConfigName,
  CustomVariable,
  CustomVariableTypesAdmitted,
  LuaFiles,
} from './../config.constants';
import { GenerateFile } from './../utils/generate-file.utils';

enum EditorState {
  BASIC = 'basic',
  DIFF = 'diff',
}

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.scss'],
})
export class GenerationComponent {
  editorMode: EditorState = EditorState.BASIC;
  diffEditor?: MonacoStandaloneDiffEditor;
  editorOptions = {
    theme: 'vs-dark',
    language: 'lua',
    formatOnType: true,
    formatOnPaste: true,
    readOnly: false,
  };

  luaFiles: LuaFiles = { savedFile: '', newFile: '' };

  get editorState(): typeof EditorState {
    return EditorState;
  }
  constructor(private _lsService: LocalStorageService, private utilsService: UtilsService) {
    this.luaFiles = this._lsService.getFromLS(LSConstants.LS_LUA_FILES);
    this.editorMode = this.luaFiles.newFile && this.luaFiles.newFile !== '' ? this.editorState.DIFF : this.editorState.BASIC;
  }

  generateFile(): void {
    const coreVarsDataSource: CustomVariable[] = this._lsService.getFromLS(LSConstants.LS_CORE_VARIABLES);
    const macrosList: Macro[] = this._lsService.getFromLS(LSConstants.LS_MACROS_LIST);

    const variables = [...coreVarsDataSource];
    const lsCheckboxes: CheckboxConfig[] = this._lsService.getFromLS(LSConstants.LS_CHECKBOX_CONFIGS);
    variables.push(
      ...lsCheckboxes
        .filter((ckBox) => ckBox.title === CheckboxConfigName.ADD_KEYBOARD || ckBox.title === CheckboxConfigName.ADD_SCRIPT)
        .map((ckBox) => {
          const variable: CustomVariable = {
            description: '',
            id: ckBox.title,
            type: CustomVariableTypesAdmitted.STRING,
            value: `'${ckBox.extraInfo?.toString()}'`,
          };
          return variable;
        }),
    );
    new GenerateFile(this.utilsService).generateFile(lsCheckboxes, variables, macrosList).subscribe((file) => {
      this.luaFiles.newFile = file;
      this.editorMode = this.editorState.DIFF;
    });
  }

  saveEditor(): void {
    this._lsService.put(LSConstants.LS_LUA_FILES, this.luaFiles);
    this.utilsService.showSnackBar(this.utilsService.translate('CHANGES_SAVED'));
  }

  saveDiffEditor(): void {
    // workaround because the library...
    if (this.diffEditor && this.diffEditor.getModel()) {
      const models = this.diffEditor.getModel();
      this.luaFiles.savedFile = models!.original.getValue();
      this.luaFiles.newFile = models!.modified.getValue();
    }

    this.luaFiles.savedFile = this.luaFiles.newFile;
    this.luaFiles.newFile = '';
    this.editorMode = this.editorState.BASIC;
    this.saveEditor();
  }

  discardEditorChanges(): void {
    this.luaFiles.newFile = '';
    this.editorMode = this.editorState.BASIC;
    this.saveEditor();
  }

  diffInit(editor: MonacoStandaloneDiffEditor): void {
    this.diffEditor = editor;
    let models = monaco.editor.getModels();
    models.forEach((model) => {
      monaco.editor.setModelLanguage(model, this.editorOptions.language);
    });
  }
}
