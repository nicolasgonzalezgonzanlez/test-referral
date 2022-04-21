import { audit } from './audit';
export interface applicationSetting extends audit {
  keys: string;
  value: string;
  type_key: string;
  description: string;
}
