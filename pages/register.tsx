import { FormControl, Input, InputLabel, FormHelperText, makeStyles, createStyles, Theme, Grid, Button, Container } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Layout from '../components/Layout';
import Preloader from '../components/Preloader';
import { useRegisterMutation } from '../src/generated/graphql';
import { IRegister } from '../src/interfaces';
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
    registerPreloader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '10vh'
    }
}));

const CRegister = () => {
    const router = useRouter();
    const classes = useStyles();

    const { register, handleSubmit, errors, reset } = useForm<IRegister>();

    const [ registerMutation, { loading, error, data } ] = useRegisterMutation();

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

    const handleRegister = async (data: IRegister) => {
        const recaptchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();

        registerMutation({
            variables: {
                ...data,
                recaptchaToken
            }
        }).then(() => {
            reset();
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Verify Email => Sent To Your Email Address',
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
                            <Button size='large' startIcon={ <CodeIcon /> }>Why'd you come, you knew you should have stayed.</Button>
                            <NextLink passHref href='/login'>
                                <Button variant='contained' color='secondary'>
                                    Login
                                </Button>
                            </NextLink>
                        </Grid>
                        <Grid item lg={ 6 } xs={ 12 }>
                            <form onSubmit={ handleSubmit(handleRegister) } autoComplete='off'>
                                <FormControl fullWidth error={ errors.name ? true : false }>
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <Input id="name" name='name' inputRef={ register({
                                        required: 'name is required',
                                        maxLength: {
                                            value: 20,
                                            message: 'Name cannot exceed 20 chars'
                                        }
                                    }) } />
                                    { errors.name ? <FormHelperText
                                        error
                                        id="name-helper-text">{ errors.name.message }
                                    </FormHelperText> : null }
                                </FormControl>
                                <FormControl error={ errors.email ? true : false }
                                    fullWidth>
                                    <InputLabel htmlFor="email"> Email</InputLabel>
                                    <Input name='email' id="email" inputRef={ register({
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Email is invalid'
                                        }
                                    }) } />
                                    { errors.email ? <FormHelperText
                                        error
                                        id="email-helper-text">{ errors.email.message }
                                    </FormHelperText> : null }
                                </FormControl>
                                <FormControl fullWidth error={ errors.username ? true : false }>
                                    <InputLabel htmlFor="username"> Username</InputLabel>
                                    <Input id="username" name='username' inputRef={ register({
                                        required: 'Username is required',
                                        maxLength: {
                                            value: 20,
                                            message: 'Username cannot exceed 20 chars'
                                        }
                                    }) } />
                                    { errors.username ? <FormHelperText
                                        error
                                        id="username-helper-text">{ errors.username.message }
                                    </FormHelperText> : <FormHelperText id="username-helper-text">What is your poison?</FormHelperText> }

                                </FormControl>
                                <FormControl error={ errors.password ? true : false }
                                    fullWidth>
                                    <InputLabel htmlFor="password"> Password</InputLabel>
                                    <Input type='password' name='password' id="password" inputRef={ register({
                                        required: 'Password is required',
                                        maxLength: {
                                            value: 30,
                                            message: 'Password cannot exceed 30 chars'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be atleast 8 chars long'
                                        },
                                        validate: value => {
                                            return (
                                                [ /[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/ ].every((pattern) =>
                                                    pattern.test(value)
                                                ) || "Password must include lower, upper, number, and special chars"
                                            );
                                        },
                                    }) } />
                                    { errors.password ? <FormHelperText
                                        error
                                        id="password-helper-text">{ errors.password.message }
                                    </FormHelperText> : <FormHelperText
                                        id="password-helper-text">What is your dirty little secret?</FormHelperText> }
                                </FormControl>
                                <ReCAPTCHA sitekey={ process.env.NEXT_PUBLIC_RECAPTCHA_KEY } size='invisible' ref={ recaptchaRef } />
                                <Button type='submit' className={ classes.submit } variant='contained' color='primary'>
                                    Register
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                    { loading ? <div className={ classes.registerPreloader }>
                        <Preloader />
                    </div> : null }
                </Container>
            </div>
        </Layout>
    );
};


export default withApolloAuth({ ssr: false })(CRegister);
