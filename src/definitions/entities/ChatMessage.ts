import { IBaseEntity } from '@definitions/entities/BaseEntity';

export interface IChatMessage extends IBaseEntity {
  text: string;
}
