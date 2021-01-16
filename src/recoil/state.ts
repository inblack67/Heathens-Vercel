import { atom } from 'recoil';
import { ISnackbarProps } from '../interfaces';

export const snackbarState = atom<ISnackbarProps>({
    key: 'snackbarState',
    default: {
        isActive: false,
        message: null,
        severity: {
            type: null
        }
    }
});
