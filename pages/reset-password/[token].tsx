import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Container } from "next/app";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Preloader from "../../components/Preloader";
import { useResetPasswordMutation } from '../../src/generated/graphql';
import NextLink from 'next/link';
import { useRecoilState } from "recoil";
import { snackbarState } from "../../src/recoil/state";
import { withApolloAuth } from "../../src/apollo/auth";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(8),
    },
    dflex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    yverticalMargin: {
        margin: '1rem 0 1rem 0'
    }
}));

const ResetPassword = () => {

    const router = useRouter();
    const classes = useStyles();

    const { token } = router.query;
    const [ resetPassword, { loading, data, error } ] = useResetPasswordMutation();

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

    const resetPasswordSubmit = data => {
        resetPassword({
            variables: {
                token: token as string,
                newPassword: 'ok'
            }
        }).then(() => {
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Password Changed Successfully',
                severity: {
                    ...snackbar.severity,
                    type: 'success',
                }
            });
        }).catch(err => console.error(err));
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <Layout>
            <div className={ classes.root }>
                <Container>
                    { data ? <div className={ classes.dflex }>
                        <Alert severity='success'>
                            Your Email has been successfully verified.
                            </Alert>
                        <NextLink href='/login' passHref>
                            <Button className={ classes.yverticalMargin } variant='contained' color='primary'>
                                Login
                        </Button>
                        </NextLink>
                    </div> : <div className={ classes.dflex }>
                            <Alert severity='error'>
                                Something Went Wrong.
                            </Alert>
                            <NextLink href='/' passHref>
                                <Button className={ classes.yverticalMargin } variant='contained' color='primary'>
                                    Back Home
                                    </Button>
                            </NextLink>
                        </div> }
                </Container>
            </div>
        </Layout>
    );
};

export default withApolloAuth({ ssr: false })(ResetPassword); 
