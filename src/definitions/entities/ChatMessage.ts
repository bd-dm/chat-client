import { IBaseEntity } from '@definitions/entities/BaseEntity';

export interface IChatMessage extends IBaseEntity {
  text: string;
  chatRoom: {id: string};
}

export interface IChatRoom extends IBaseEntity {
  name: string;
}
