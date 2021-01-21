import { FormControl, Input, InputLabel, FormHelperText, makeStyles, createStyles, Theme, Grid, Button, Container } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Layout from '../components/Layout';
import Preloader from '../components/Preloader';
import { withApollo } from '../src/apollo';
import { AUTH_HOMEPAGE } from '../src/constants';
import { useLoginMutation } from '../src/generated/graphql';
import { ILogin } from '../src/interfaces';
import { snackbarState } from '../src/recoil/state';
import { theme } from '../styles/styles';
import NextLink from 'next/link';
import { withApolloAuth } from '../src/apollo/auth';
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
    }
}));

const CLogin = () => {
    const router = useRouter();
    const classes = useStyles();

    const { register, handleSubmit, errors, reset } = useForm<ILogin>();

    const [ loginMutation, { loading, error, data } ] = useLoginMutation();

    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const recaptchaRef = useRef<ReCAPTCHA>();

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

    const handleLogin = async ({ username, password }: ILogin) => {
        const recaptchaToken = await recaptchaRef.current.executeAsync();

        recaptchaRef.current.reset();

        loginMutation({
            variables: {
                username,
                password,
                recaptchaToken
            }
        }).then(() => {
            reset();
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Logged In!',
                severity: {
                    ...snackbar.severity,
                    type: 'success',
                }
            });

            router.push(AUTH_HOMEPAGE);

        }).catch(err => console.error(err));
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <Layout>
            <div className={ classes.root }>
                <Container>
                    <Grid container spacing={ 2 } alignItems='center' justify='center' >
                        <Grid item lg={ 6 } xs={ 12 }>
                            <div className={ classes.loginLinks }>
                                <div>
                                    <NextLink href='/register' passHref>
                                        <Button startIcon={ <CodeIcon /> }>Register</Button>
                                    </NextLink>
                                    <NextLink passHref href='/reset-password'>
                                        <Button color='secondary' className={ classes.horizontalMargin } startIcon={ <CodeIcon /> }>Reset Password</Button>
                                    </NextLink>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={ 6 } xs={ 12 }>
                            <form onSubmit={ handleSubmit(handleLogin) } autoComplete='off'>
                                <FormControl fullWidth error={ errors.username ? true : false }>
                                    <InputLabel htmlFor="username"> Username</InputLabel>
                                    <Input id="username" name='username' inputRef={ register({
                                        required: 'Username is required',
                                    }) } />
                                    <FormHelperText id="username-helper-text">What was your poison?</FormHelperText>
                                </FormControl>
                                <FormControl error={ errors.password ? true : false }
                                    fullWidth>
                                    <InputLabel htmlFor="password"> Password</InputLabel>
                                    <Input type='password' name='password' id="password" inputRef={ register({
                                        required: 'Password is required'
                                    }) } />
                                    <FormHelperText
                                        id="password-helper-text">What was your dirty little secret?</FormHelperText>
                                </FormControl>
                                <ReCAPTCHA sitekey={ process.env.NEXT_PUBLIC_RECAPTCHA_KEY } size='invisible' ref={ recaptchaRef } />
                                <Button type='submit' className={ classes.submit } variant='contained' color='primary'>
                                    Login
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Layout>
    );
};

export default withApolloAuth({ ssr: false })(CLogin); 
