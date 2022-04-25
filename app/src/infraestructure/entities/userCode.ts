import { audit } from './audit';
export interface userCode extends audit {
  user_code_id: number;
  code: string;
}
