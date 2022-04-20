import { audit } from './audit';
export interface applicationSettings extends audit {
  keys: string;
  value: string;
  type_key: string;
}
