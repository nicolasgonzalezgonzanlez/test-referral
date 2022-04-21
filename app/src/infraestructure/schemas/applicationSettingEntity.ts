import { EntitySchema } from 'typeorm';
import { applicationSetting } from '../entities';
import {AuditColumnSchemaPart} from './audit'

export const applicationSettingEntity = new EntitySchema<applicationSetting>({
  name: 'application_setting',
  columns: {
    keys: {
      type: String,
      length: 200,
      primary: true
    },
    value: {
      type: String,
      length: 200,
    },
    type_key: {
      type: String,
      length: 200,
    },
    description: {
      type: String,
      length: 500,
    },
    ...AuditColumnSchemaPart
  },
});
