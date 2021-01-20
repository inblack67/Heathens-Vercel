import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Container } from "next/app";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Preloader from "../../components/Preloader";
import { useVerifyEmailMutation } from '../../src/generated/graphql';
import NextLink from 'next/link';
import { useRecoilState } from "recoil";
import { snackbarState } from "../../src/recoil/state";
import { withApolloAuth } from "../../src/apollo/auth";
import { FC, useEffect } from "react";
import { NextPageContext } from "next";

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

const VerifyEmail: FC<{ token: string; }> = ({ token }) => {

    const classes = useStyles();

    const [ verifyEmail, { loading, data, error } ] = useVerifyEmailMutation();

    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    useEffect(() => {
        verifyEmail({
            variables: {
                token: token as string
            }
        }).then(() => {
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Email Verified Successfully',
                severity: {
                    ...snackbar.severity,
                    type: 'success',
                }
            });
        }).catch(err => console.error(err));
    }, []);

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

    return (
        <Layout>
            {loading ? <Preloader /> : null }
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

export const getServerSideProps = async ({ query }: NextPageContext) => {
    const { token } = query;
    return {
        props: { token }
    };
};

export default withApolloAuth({ ssr: false })(VerifyEmail); 
