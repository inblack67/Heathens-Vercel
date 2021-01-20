import { SState } from "./types";

const severityTypes = [ 'error', 'warning', 'info', 'success' ] as const;
export interface ISeverities {
    type: typeof severityTypes[ number ];
}

export interface ISnackbarProps {
    severity: ISeverities;
    message: string;
    isActive: boolean;
}

export interface ISContext extends SState {
    setSnackbar: (_: SState) => void;
};

export interface ILogin {
    username: string,
    password: string;
}

export interface IResetPassword {
    newPassword: string,
    confirmPassword: string;
}

export interface IRegister {
    name: string;
    email: string;
    username: string,
    password: string;
}

export interface IPostMessage {
    content: string;
}

export interface IAuth {
    username: String;
    id: Number | String;
}

export interface IChannel {
    id: number;
    name: string;
    desc: string;
    users?: IAuth[];
}
