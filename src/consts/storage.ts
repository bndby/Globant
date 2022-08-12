import {DocumentPickerOptions} from 'react-native-document-picker';
import {SupportedPlatforms} from 'react-native-document-picker/lib/typescript/fileTypes';

export const PickedType = {
  Image: 'image',
  Sheet: 'sheet',
  None: 'none',
} as const;

export type GlobantImage = {
  id: number;
  data: string;
  name: string;
  width: number;
  height: number;
};

export const STORAGE_IMAGES = 'globant_images';

export type GlobantSheet = {
  id: number;
  data: string;
  name: string;
  total: number;
};

export const STORAGE_SHEETS = 'globant_sheets';

export const IMAGE_MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg'];
export const SHEET_MIMETYPES = ['text/csv', 'text/comma-separated-values'];

export const PICKER_PROPS: DocumentPickerOptions<SupportedPlatforms> = {
  presentationStyle: 'fullScreen',
  copyTo: 'cachesDirectory',
  type: [...IMAGE_MIMETYPES, ...SHEET_MIMETYPES],
};

export const FILE_PREFIX = 'file:///';
export const FILE_WRONG_PREFIX = 'file:/';

export const EMPTY_STORAGE_VALUE = '[]';

export const IMAGE_ENCODING = 'base64';
export const SHEET_ENCODING = 'utf8';

export const SHEET_HEADER = 'Total';

export const IMAGE_PREFIX = 'data:image/png;base64,';
