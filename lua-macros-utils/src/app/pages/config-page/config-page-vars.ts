import { CheckboxConfig, CheckboxConfigName, ConfigFiles, DataTypes } from './config.constants';

export const CheckboxConfigurations: CheckboxConfig[] = [
  {
    title: CheckboxConfigName.ADD_KEYBOARD,
    value: false,
    extraInfoNeeded: true,
    extraInfo: '',
    extraInfoType: DataTypes.STRING,
    configFileAssociated: ConfigFiles.FILE_ADD_KEYBOARD,
  },
  {
    title: CheckboxConfigName.ADD_SCRIPT,
    value: false,
    extraInfoNeeded: true,
    extraInfo: '',
    extraInfoType: DataTypes.STRING,
    configFileAssociated: ConfigFiles.FILE_SCRIPT_PATH,
  },
  {
    title: CheckboxConfigName.MINIMIZE_TO_TRAY,
    value: true,
    extraInfoNeeded: true,
    extraInfo: false,
    extraInfoType: DataTypes.BOOLEAN,
    configFileAssociated: ConfigFiles.FILE_MINIMIZE_TO_TRAY,
  },
  {
    title: CheckboxConfigName.SOUND,
    value: true,
    extraInfoNeeded: true,
    extraInfo: false,
    extraInfoType: DataTypes.BOOLEAN,
    configFileAssociated: ConfigFiles.FILE_SOUND,
  },
  {
    title: CheckboxConfigName.VERBOSE,
    value: true,
    extraInfoNeeded: true,
    extraInfo: false,
    extraInfoType: DataTypes.BOOLEAN,
    configFileAssociated: ConfigFiles.FILE_VERBOSE,
  },
  {
    title: CheckboxConfigName.UNKNOWN_TO_KEY,
    value: true,
    extraInfoNeeded: true,
    extraInfo: true,
    extraInfoType: DataTypes.BOOLEAN,
    configFileAssociated: ConfigFiles.FILE_UNKNOWN_TO_KEY,
  },
  {
    title: CheckboxConfigName.DISABLE_MACRO,
    value: true,
    extraInfoNeeded: true,
    extraInfo: false,
    extraInfoType: DataTypes.BOOLEAN,
    configFileAssociated: ConfigFiles.FILE_DISABLE_KEYBOARD,
  },
  {
    title: CheckboxConfigName.DISABLE_KEYBOARD,
    value: true,
    extraInfoNeeded: true,
    extraInfo: false,
    extraInfoType: DataTypes.BOOLEAN,
    configFileAssociated: ConfigFiles.FILE_DISABLE_MACRO,
  },
  { title: CheckboxConfigName.MACROS_TO_EXTERNAL_FILE, value: false },
  {
    title: CheckboxConfigName.KEYS_USER_FRIENDLY,
    value: false,
    extraInfoNeeded: true,
    extraInfo: false,
    extraInfoType: DataTypes.BOOLEAN,
    configFileAssociated: ConfigFiles.FILE_KEYS_USER_FRIENDLY,
  },
];

export const CoreTableColsSchema = [
  {
    key: 'description',
    type: 'text',
    label: 'VARIABLE',
  },
  {
    key: 'value',
    type: 'boolean',
    label: 'VALUE',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

export const CustomTableColsSchema = [
  {
    key: 'description',
    type: 'text',
    label: 'VARIABLE',
  },
  {
    key: 'type',
    type: 'select',
    label: 'TYPE',
  },
  {
    key: 'value',
    type: 'text',
    label: 'VALUE',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
