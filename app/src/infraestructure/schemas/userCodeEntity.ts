import { EntitySchema } from 'typeorm';
import { userCode } from '../entities';
import {AuditColumnSchemaPart} from './audit'

export const userCodeEntity = new EntitySchema<userCode>({
  name: 'user_code',
  columns: {
    user_code_id: {
      type: Number,
      primary: true
    },
    code: {
      type: String,
      length: 200,
    },   
    ...AuditColumnSchemaPart
  },
});
