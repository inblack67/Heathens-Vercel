import { FormControl, Input, InputLabel, FormHelperText, makeStyles, createStyles, Theme, Grid, Button, Container } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Layout from '../../components/Layout';
import Preloader from '../../components/Preloader';
import { withApollo } from '../../src/apollo';
import { AUTH_HOMEPAGE } from '../../src/constants';
import { useLoginMutation, useResetPasswordMutation } from '../../src/generated/graphql';
import { ILogin, IResetPassword } from '../../src/interfaces';
import { snackbarState } from '../../src/recoil/state';
import { theme } from '../../styles/styles';
import NextLink from 'next/link';
import { withApolloAuth } from '../../src/apollo/auth';
import { NextPageContext } from 'next';
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

const CResetPassword = ({ token }) => {
    const router = useRouter();
    const classes = useStyles();

    const { register, handleSubmit, errors, reset } = useForm<IResetPassword>();

    const recaptchaRef = useRef<ReCAPTCHA>();

    const [ resetPasswordMutation, { loading, error } ] = useResetPasswordMutation();

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

    const handlePasswordReset = async ({ newPassword, confirmPassword }: IResetPassword) => {

        const recaptchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();

        if (newPassword !== confirmPassword) {
            reset();
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Passwords Do Not Match',
                severity: {
                    ...snackbar.severity,
                    type: 'error',
                }
            });
            return;
        }

        resetPasswordMutation({
            variables: {
                newPassword,
                token,
                recaptchaToken
            }
        }).then(() => {
            reset();
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Password Changed Successfully',
                severity: {
                    ...snackbar.severity,
                    type: 'success',
                }
            });

            router.push('/login');

        }).catch(err => console.error(err));
    };

    return (
        <Layout>
            {loading ? <Preloader /> : null }
            <div className={ classes.root }>
                <Container>
                    <Grid container spacing={ 2 } alignItems='center' justify='center' >
                        <Grid item lg={ 6 } xs={ 12 }>
                            <div className={ classes.loginLinks }>
                                <div>
                                    <Button startIcon={ <CodeIcon /> }>Reset Your Password Password</Button>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={ 6 } xs={ 12 }>
                            <form onSubmit={ handleSubmit(handlePasswordReset) } autoComplete='off'>
                                <FormControl error={ errors.newPassword ? true : false }
                                    fullWidth>
                                    <InputLabel htmlFor="newPassword"> New Password</InputLabel>
                                    <Input type='password' name='newPassword' id="newPassword" inputRef={ register({
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
                                    { errors.newPassword ? <FormHelperText
                                        error
                                        id="newPassword-helper-text">{ errors.newPassword.message }
                                    </FormHelperText> : <FormHelperText
                                        id="newPassword-helper-text">What is your new dirty little secret?</FormHelperText> }
                                </FormControl>
                                <FormControl error={ errors.confirmPassword ? true : false }
                                    fullWidth>
                                    <InputLabel htmlFor="confirmPassword"> Confirm Password</InputLabel>
                                    <Input type='password' name='confirmPassword' id="confirmPassword" inputRef={ register({
                                        required: 'Password Confirmation is required',
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
                                    { errors.confirmPassword ? <FormHelperText
                                        error
                                        id="confirmPassword-helper-text">{ errors.confirmPassword.message }
                                    </FormHelperText> : <FormHelperText
                                        id="confirmPassword-helper-text">What don't you confirm it?</FormHelperText> }
                                </FormControl>
                                <ReCAPTCHA sitekey={ process.env.NEXT_PUBLIC_RECAPTCHA_KEY } size='invisible' ref={ recaptchaRef } />
                                <Button type='submit' className={ classes.submit } variant='contained' color='primary'>
                                    Reset
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Layout>
    );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
    const { token } = ctx.query;
    return {
        props: { token }
    };
};

export default withApolloAuth({ ssr: false })(CResetPassword); 
