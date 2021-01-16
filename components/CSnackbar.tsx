import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { snackbarState } from '../src/recoil/state';

const Alert = (props: any) => {
    return <MuiAlert elevation={ 6 } variant='filled' { ...props } />;
};

const CSnackbar = () => {

    const { isActive, severity, message } = useRecoilValue(snackbarState);

    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const handleClose = () => {
        setSnackbar({
            ...snackbar,
            isActive: false,
            message: null,
            severity: {
                ...snackbar.severity,
                type: null
            }
        });
    };

    return (
        isActive ? <div>
            <Snackbar open={ isActive } autoHideDuration={ 6000 } onClose={ handleClose }>
                <Alert onClose={ handleClose } severity={ severity?.type }>
                    { message }
                </Alert>
            </Snackbar>
        </div> : null
    );
};

export default CSnackbar;
