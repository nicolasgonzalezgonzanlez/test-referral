import { EntitySchema } from 'typeorm';
import { applicationSettings } from '../entities';
import {AuditColumnSchemaPart} from './audit'

export const applicationSettingsSchema = new EntitySchema<applicationSettings>({
  name: 'application_settings',
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
    ...AuditColumnSchemaPart
  },
});
