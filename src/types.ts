import { ISeverities } from './interfaces';

export type SState = {
    message: string;
    isActive: boolean;
    severity: ISeverities;
};