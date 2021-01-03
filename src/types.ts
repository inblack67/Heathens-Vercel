import * as contextTypes from '../context/contextTypes';
import { ISeverities } from './interfaces';

const myContextTypes = Object.values( contextTypes );

export type SState = {
    message: string;
    isActive: boolean;
    severity: ISeverities;
};

export type SAction = {
    payload: SState,
    type: typeof myContextTypes[ number ];
};