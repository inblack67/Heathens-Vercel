import { useState, SyntheticEvent, Fragment, useEffect } from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import GithubIcon from '@material-ui/icons/GitHub';
import { Grid, Typography, Button, IconButton, Toolbar, AppBar, Drawer, makeStyles, createStyles, Theme, Box } from '@material-ui/core';
import { useGetMeQuery, useLogoutMutation } from '../src/generated/graphql';
import { useRouter } from 'next/router';
import { routes } from '../src/routes';
import { useRecoilState } from 'recoil';
import { snackbarState } from '../src/recoil/state';
import { useApolloClient } from '@apollo/client';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
        },
        list: {
            width: drawerWidth,
            textAlign: 'center',
            marginTop: '1.5rem'
        },
        paper: {
            background: '#161710'
        }
    }),
);

const VariantDrawer = () => {
    const router = useRouter();
    const classes = useStyles();
    const [ open, setOpen ] = useState(false);

    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const { error, data } = useGetMeQuery();
    const [ logoutMutation ] = useLogoutMutation();
    const apolloClient = useApolloClient();

    useEffect(() => {
        if (error && routes.privateRoutes.includes(router.pathname)) {
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: error.message,
                severity: {
                    ...snackbar.severity,
                    type: 'error'
                }
            });
            router.replace('/login');
        }
    }, [ error ]);

    const handleLogout = (_: SyntheticEvent) => {
        logoutMutation().then(async () => {
            await apolloClient.resetStore();
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Logged Out!',
                severity: {
                    ...snackbar.severity,
                    type: 'success'
                }
            });
            router.push('/login');
        }).catch(err => console.error(err));
    };

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };

    let smartLinks = data && data.getMe ? <Fragment>
        <Box display={ { xs: 'none', sm: 'inline' } }>
            <Button color='inherit'>Welcome { data.getMe.username }</Button>
        </Box>
        <Button color='inherit' onClick={ handleLogout }>Logout</Button>
        <a href="https://github.com/inblack67/Heathens" rel='noopener noreferrer' target='_blank'>
            <IconButton>
                <GithubIcon />
            </IconButton>
        </a>
    </Fragment> : <Fragment>
            <NextLink href='/login' passHref>
                <Button color='inherit'>Login</Button>
            </NextLink>
            <Box display={ { xs: 'none', sm: 'inline' } }>
                <NextLink href='/register' passHref>
                    <Button color='inherit'>Register</Button>
                </NextLink>
            </Box>
            <a href="https://github.com/inblack67/Heathens" rel='noopener noreferrer' target='_blank'>
                <IconButton>
                    <GithubIcon />
                </IconButton>
            </a>
        </Fragment>;

    return (
        <div className={ classes.root }>
            <AppBar
                position="static"
                className={ clsx(classes.appBar) }
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={ toggleDrawer(true) }
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid container alignItems='center' justify='space-between'>
                        <Grid item>
                            <NextLink passHref href='/'>
                                <Button size='large'>
                                    Heathens
                        </Button>
                            </NextLink>
                        </Grid>
                        <Grid item>
                            { smartLinks }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer classes={ { paper: classes.paper } } open={ open } onClose={ toggleDrawer(false) }>
                <div className={ classes.list }>
                    <Typography>
                        What do you want?
                    </Typography>
                </div>
            </Drawer>
        </div>
    );
};

export default VariantDrawer;
