import { Entity } from '../../../config/addition/advance';


export type Units = Entity<number> & {
    idgps?: number;
    model?: string;
    serie?: string;
    year?: string;
    color?: string;
    line?: string;
    unit_name?: string;
    group_name?: string;
};
  