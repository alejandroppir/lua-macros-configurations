export interface CheckboxConfig {
  title: string;
  value: boolean;
  extraInfoNeeded?: boolean;
  extraInfo?: string | boolean;
  extraInfoType?: DataTypes;
  configFileAssociated?: string;
}

export interface CustomVariable {
  id: string;
  description: string;
  value: string;
  type: CustomVariableTypesAdmitted;
  isEdit?: boolean;
}

export interface LuaFiles {
  savedFile: string;
  newFile: string;
}

export enum DataTypes {
  BOOLEAN = 'BOOLEAN',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  UNDEFINED = '',
}

export enum CustomVariableTypesAdmitted {
  BOOLEAN = 'BOOLEAN',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  UNDEFINED = '',
}

export enum ConfigFiles {
  FILE_TEMPLATE = '.template',
  FILE_ADD_KEYBOARD = 'add-keyboard.template',
  FILE_MINIMIZE_TO_TRAY = 'minimize.template',
  FILE_SCRIPT_PATH = 'script-path.template',
  FILE_SOUND = 'sound.template',
  FILE_VERBOSE = 'verbose.template',
  FILE_DISABLE_MACRO = 'disable-macro.template',
  FILE_DISABLE_KEYBOARD = 'disable-keyboard.template',
  FILE_UNKNOWN_TO_KEY = 'unknown-to-key.template',
  FILE_KEYS_USER_FRIENDLY = 'keys-user-friendly.template',
}

export enum CheckboxConfigName {
  ADD_KEYBOARD = 'ADD_KEYBOARD',
  ADD_SCRIPT = 'ADD_SCRIPT',
  MINIMIZE_TO_TRAY = 'MINIMIZE_TO_TRAY',
  SOUND = 'SOUND',
  VERBOSE = 'VERBOSE',
  UNKNOWN_TO_KEY = 'UNKNOWN_TO_KEY',
  DISABLE_MACRO = 'DISABLE_MACRO',
  DISABLE_KEYBOARD = 'DISABLE_KEYBOARD',
  MACROS_TO_EXTERNAL_FILE = 'MACROS_TO_EXTERNAL_FILE',
  KEYS_USER_FRIENDLY = 'KEYS_USER_FRIENDLY',
}
