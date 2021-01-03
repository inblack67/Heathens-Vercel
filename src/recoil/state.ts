import { atom } from 'recoil';
import { ISnackbarProps, IAuth, IChannel } from '../interfaces';

export const snackbarState = atom<ISnackbarProps>( {
    key: 'snackbarState',
    default: {
        isActive: false,
        message: null,
        severity: {
            type: null
        }
    }
} );

export const authState = atom<IAuth>( {
    key: 'authState',
    default: null
} );

export const channelState = atom<IChannel>( {
    key: 'channelState',
    default: null
} );