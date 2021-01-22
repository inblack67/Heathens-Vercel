import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { ChannelEntity, useLeaveChannelMutation, UserEntity } from "../src/generated/graphql";
import { snackbarState } from "../src/recoil/state";
import CChat from "./CChat";
import CSingleChannel from "./CSingleChannel";
import Preloader from "./Preloader";

const useStyles = makeStyles((theme: Theme) => createStyles({
    verticalMargin: {
        margin: '1rem 0 1rem 0'
    },
    messageArea: {
        height: '65vh',
        overflowY: 'auto',
    },
    chatSection: {
        maxWidth: '100%',
        height: '100%',
        background: '#161710',
        border: `1px solid ${ theme.palette.primary.main }`
    },
}));

interface ICChannel {
    channel: {
        __typename?: "ChannelEntity";
    } & Pick<ChannelEntity, "desc" | "id" | "name"> & {
        users?: ({
            __typename?: "UserEntity";
        } & Pick<UserEntity, "id" | "username">)[];
    };
}

const CChannel: FC<ICChannel> = ({ channel }) => {

    const router = useRouter();
    const classes = useStyles();

    const [ leaveChannel ] = useLeaveChannelMutation();
    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const fireLeaveChannel = () => {
        leaveChannel({
            variables: {
                channelId: channel.id
            },
            update: (cache) => {
                cache.evict({ fieldName: 'getSingleChannel' });
                cache.evict({ fieldName: 'getChannelMessages' });
                cache.evict({ fieldName: 'getChannelUsers' });
                cache.evict({ fieldName: 'getMyChannel' });
            }
        }).then(() => {
            setSnackbar({
                ...snackbar,
                isActive: true,
                severity: {
                    ...snackbar.severity,
                    type: 'info'
                },
                message: 'You left the channel'
            });
            router.push('/');
        }).catch(err => console.error(err));
    };

    return (
        <div>
            {channel ? <Grid container spacing={ 8 }>
                <Grid item xs={ 12 } md={ 6 } >
                    <CSingleChannel channel={ channel } />
                </Grid>
                <Grid item xs={ 12 } md={ 6 }>
                    <CChat channelId={ channel.id } />
                </Grid>
            </Grid> : <Preloader /> }
        </div>
    );
};

export default CChannel;
