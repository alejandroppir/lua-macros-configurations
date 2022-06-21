import { concatMap, forkJoin, map, Observable, of } from 'rxjs';

import { CheckboxConfigurations } from '../config-page-vars';
import { UtilsService } from './../../../shared/services/utils.service';
import { Macro } from './../../macros-page/macros-page.component';
import { CheckboxConfig, CheckboxConfigName, ConfigFiles, CustomVariable } from './../config.constants';

interface ConfigFile {
  file: ConfigFiles;
  response: string;
}
export class GenerateFile {
  configFiles$: Observable<ConfigFile[]>;

  constructor(private utilsService: UtilsService) {
    const allowedFiles = CheckboxConfigurations.map((checkbox) => checkbox.configFileAssociated).filter((file) => file !== null);
    this.configFiles$ = forkJoin(
      Object.values(ConfigFiles)
        .filter((fileName) => allowedFiles.includes(fileName) || fileName === ConfigFiles.FILE_TEMPLATE)
        .map((configFile) =>
          this.utilsService.readAssetsFileObs(configFile).pipe(
            map((response) => ({
              file: configFile,
              response,
            })),
          ),
        ),
    );
  }

  generateFile(checkboxes: CheckboxConfig[], coreVars: CustomVariable[], macrosList: Macro[]): Observable<string> {
    const fileEnablers = checkboxes.filter((ckBox) => ckBox.value).map((ckBox) => ckBox.configFileAssociated);
    return this.configFiles$.pipe(
      concatMap((files) => {
        const template = files.find((file) => file.file === ConfigFiles.FILE_TEMPLATE);
        const nonTemplate = files.filter((file) => file.file !== ConfigFiles.FILE_TEMPLATE && fileEnablers.includes(file.file));

        const isUserFriendlyVar = coreVars.find((variable) => variable.id === CheckboxConfigName.KEYS_USER_FRIENDLY);
        const userFriendly: boolean = isUserFriendlyVar?.value ? JSON.parse(isUserFriendlyVar?.value) : false;
        this.parseMacros(template!, macrosList, userFriendly);
        this.parseBlocks(template!, nonTemplate);
        this.parseCoreVars(template!, coreVars);
        return of(template!.response);
      }),
    );
  }

  private parseBlocks(template: ConfigFile, nonTemplate: ConfigFile[]) {
    const blockPlaceholders = this.getContentBetweenTags(template?.response || '', '\\$B{', '}');

    blockPlaceholders.forEach((placeholder) => {
      const contentArray = nonTemplate
        .map((file) => this.getContentBetweenTags(file.response, placeholder).map((result) => result.replace(/((\r\n)$|(\n\r))$/, '')))
        .flat();
      template!.response = template!.response.replace(`$B{${placeholder}}`, [...contentArray, '\n'].join(''));
    });
  }

  private parseCoreVars(template: ConfigFile, coreVars: CustomVariable[]) {
    coreVars.forEach((variable) => {
      template!.response = template!.response.replace(`$V{${variable.id}}`, variable.value);
    });
  }

  private parseMacros(template: ConfigFile, macros: Macro[], isUserFriendly: boolean) {
    const macrosFormatted = macros.map(
      (macro) =>
        `elseif (button == ${isUserFriendly ? `kc.keys().${macro.key.key}` : macro.key.keyCode}) then \n\t\t\thotkey("${macro.value}", "${
          macro.label
        }")`,
    );
    template!.response = template!.response.replace(`$B{#macro-implementation}`, macrosFormatted.join('\n'));
  }

  private getContentBetweenTags(content: string, startPattern: string, endPattern: string = startPattern): string[] {
    const reg = `${startPattern}((.|[^.])*?)${endPattern}`;
    const matches = content.matchAll(new RegExp(reg, 'g'));
    return Array.from(matches, (x) => x[1]);
  }
}
