import { FC, useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import { useGetChannelsQuery, useGetMyChannelQuery, useJoinChannelMutation } from "../src/generated/graphql";
import { Divider, makeStyles, createStyles, Theme, Container, Button, Grid, Paper } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { snackbarState } from "../src/recoil/state";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { withApolloAuth } from "../src/apollo/auth";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3rem'
    },
    messageArea: {
        height: '65vh',
        overflowY: 'auto',
    },
    chatSection: {
        maxWidth: '100%',
        height: '100%',
        background: 'rgb(3, 14, 24)',
        border: `1px solid ${ theme.palette.primary.main }`
    },
    noData: {
        marginTop: '1rem'
    },
    alert: {
    }
}));

interface ICChannels {
}

const CChannels: FC<ICChannels> = () => {
    const router = useRouter();

    const { data, error, loading } = useGetChannelsQuery();
    const getMyChannelRes = useGetMyChannelQuery();

    const classes = useStyles();

    const [ channelId, setChannelId ] = useState<number>(null);

    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const [ joinChannel ] = useJoinChannelMutation();

    useEffect(() => {
        if (!getMyChannelRes.loading && getMyChannelRes.data) {
            router.replace('/dashboard');
        }
    });

    useEffect(() => {
        if (error) {
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: error.message,
                severity: {
                    ...snackbar.severity,
                    type: 'error'
                }
            });
        }
    }, [ error ]);

    const handleChannelClick = (channelId: number, name: string) => () => {
        setChannelId(channelId);
        joinChannel({
            variables: {
                channelId
            }
        }).then(() => {
            setSnackbar({
                ...snackbar,
                isActive: true,
                message: 'Channel Joined!',
                severity: {
                    ...snackbar.severity,
                    type: 'info'
                }
            });

            router.push('/dashboard');

        }).catch(err => console.error(err));
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <Layout>
            <div className={ classes.root }>
                <div>
                    <Alert className={ `${ classes.noData } ${ classes.alert }` } severity='info'>
                        Active Channels
                    </Alert>
                    <Grid container component={ Paper } className={ classes.chatSection }>
                        <Grid item xs={ 12 }>
                            <Container>
                                <div className={ classes.messageArea }>
                                    { data && data.getChannels.length > 0 ? data.getChannels.map(channel => <div key={ channel.id }>
                                        <Alert severity='info'>
                                            { channel.name }
                                            <p>
                                                { channel.desc }
                                            </p>
                                            <Button onClick={ handleChannelClick(channel.id, channel.name) } disabled={ channel.id === channelId } color='secondary' variant='contained'>
                                                Join
                                            </Button>
                                        </Alert>
                                        <Divider />
                                    </div>) : null }
                                </div>
                            </Container>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Layout>
    );
};

export default withApolloAuth({ ssr: false })(CChannels);
