import { FormControl, Input, InputLabel, FormHelperText, makeStyles, createStyles, Theme, Grid, Button, Container } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Layout from '../../components/Layout';
import Preloader from '../../components/Preloader';
import { useForgotPasswordMutation } from '../../src/generated/graphql';
import { snackbarState } from '../../src/recoil/state';
import { theme } from '../../styles/styles';
import { withApolloAuth } from '../../src/apollo/auth';
import ReCAPTCHA from 'react-google-recaptcha';

const useStyles = makeStyles((_: Theme) => createStyles({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
    },
    btns: {
        marginTop: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(2)
    },
    marginAuto: {
        margin: 'auto'
    },
    submit: {
        marginTop: theme.spacing(2)
    },
    horizontalMargin: {
        margin: '0 1rem 0 1rem'
    },
    loginLinks: {
        display: 'flex',
        flexDirection: 'column',
    },
    reset: {
        marginTop: '1rem'
    },
    requestPreloader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '20vh'
    }
}));

const RequestResetPassword = () => {
    const router = useRouter();
    const classes = useStyles();

    const { register, handleSubmit, errors, reset } = useForm<{ email: string; }>();

    const [ forgotPassword, { loading, error } ] = useForgotPasswordMutation();

    const recaptchaRef = useRef<ReCAPTCHA>();

    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    useEffect(() => {
        if (error) {
            console.log('error = ', error);
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: error.message,
                severity: {
                    ...snackbar.severity,
                    type: 'error',
                }
            });
        }
    }, [ error ]);

    const handleRequest = async ({ email }: { email: string; }) => {
        const recaptchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        forgotPassword({
            variables: {
                email,
                recaptchaToken
            }
        }).then(() => {
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Check Your Email',
                severity: {
                    ...snackbar.severity,
                    type: 'info',
                }
            });
        }).catch(err => console.error(err));
    };

    return (
        <Layout>
            <div className={ classes.root }>
                <Container>
                    <Grid container spacing={ 2 } alignItems='center' justify='center' >
                        <Grid item lg={ 6 } xs={ 12 }>
                            <div className={ classes.loginLinks }>
                                <div>
                                    <Button startIcon={ <CodeIcon /> }>Request Reset Password</Button>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={ 6 } xs={ 12 }>
                            <form onSubmit={ handleSubmit(handleRequest) } autoComplete='off' noValidate>
                                <FormControl error={ errors.email ? true : false }
                                    fullWidth>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input type='email' name='email' id="email" inputRef={ register({
                                        required: 'Email is required',
                                    }) } />
                                    { errors.email ? <FormHelperText
                                        error
                                        id="email-helper-text">{ errors.email.message }
                                    </FormHelperText> : <FormHelperText
                                        id="email-helper-text">What is your email?</FormHelperText> }
                                </FormControl>
                                <ReCAPTCHA sitekey={ process.env.NEXT_PUBLIC_RECAPTCHA_KEY } size='invisible' ref={ recaptchaRef } />
                                <Button type='submit' className={ classes.submit } variant='contained' color='primary'>
                                    Request
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                    { loading ? <div className={ classes.requestPreloader }>
                        <Preloader />
                    </div> : null }
                </Container>
            </div>
        </Layout>
    );
};

export default withApolloAuth({ ssr: false })(RequestResetPassword); 
