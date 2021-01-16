import { FC, useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import { useGetChannelsQuery, useGetMyChannelQuery, useJoinChannelMutation } from "../src/generated/graphql";
import { List, ListItem, makeStyles, createStyles, Theme, ListItemText, ListItemIcon } from "@material-ui/core";
import DevicesIcon from '@material-ui/icons/Devices';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { useRecoilState } from "recoil";
import { snackbarState } from "../src/recoil/state";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { withApolloAuth } from "../src/apollo/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    drawerPaper: {
        width: drawerWidth,
        // background: theme.palette.primary.main,
        background: '#2D343D',
    },
    channel: {

    },
    textCenter: {
        textAlign: 'center'
    },
    current: {
        color: theme.palette.secondary.main
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
            <List>
                { data ? data.getChannels.map((channel) => (
                    <ListItem disabled={ channel.id === channelId } button key={ channel.id }>
                        <ListItemIcon className={ channel.id === channelId ? classes.current : null }><DevicesIcon /></ListItemIcon>
                        <ListItemText className={ channel.id === channelId ? classes.current : null } onClick={ handleChannelClick(channel.id, channel.name) } primary={ channel.name } />
                    </ListItem>
                )) : <ListItem button>
                        <ListItemIcon><AcUnitIcon /></ListItemIcon>
                        No channels yet
                </ListItem> }
            </List>
        </Layout>
    );
};

export default withApolloAuth({ ssr: false })(CChannels);
