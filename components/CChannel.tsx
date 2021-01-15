import { Button, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { AUTH_HOMEPAGE } from "../src/constants";
import { ChannelEntity, useLeaveChannelMutation, UserEntity } from "../src/generated/graphql";
import { channelState, snackbarState } from "../src/recoil/state";
import CChat from "./CChat";
import ChannelUsers from "./ChannelUsers";

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    verticalMargin: {
        margin: '1rem 0 1rem 0'
    },
} ) );

interface ICChannel
{
    channel: {
        __typename?: "ChannelEntity";
    } & Pick<ChannelEntity, "desc" | "id" | "name"> & {
        users?: ( {
            __typename?: "UserEntity";
        } & Pick<UserEntity, "id" | "username"> )[];
    };
}

const CChannel: FC<ICChannel> = ( { channel } ) =>
{

    const router = useRouter();
    const classes = useStyles();

    const [ leaveChannel ] = useLeaveChannelMutation();
    const [ _, setChannel ] = useRecoilState( channelState );
    const [ snackbar, setSnackbar ] = useRecoilState( snackbarState );

    const fireLeaveChannel = () =>
    {
        leaveChannel( {
            variables: {
                channelId: channel.id
            },
            update: ( cache ) =>
            {
                cache.evict( { fieldName: 'getSingleChannel' } );
                cache.evict( { fieldName: 'getChannelMessages' } );
                cache.evict( { fieldName: 'getChannelUsers' } );
                cache.evict( { fieldName: 'getMyChannel' } );
            }
        } ).then( () =>
        {
            setChannel( null );
            setSnackbar( {
                ...snackbar,
                isActive: true,
                severity: {
                    ...snackbar.severity,
                    type: 'info'
                },
                message: 'You left the channel'
            } );
            router.push( '/' );
        } ).catch( err => console.error( err ) );
    };

    return (
        <div>
            {channel ? <Grid container >
                <Grid item xs={ 12 } md={ 6 } >
                    <Typography variant='h5' color='secondary'>
                        { channel.name }
                    </Typography>
                    <Typography variant='h6'>
                        { channel.desc }
                    </Typography>
                    <Button onClick={ fireLeaveChannel } className={ classes.verticalMargin } variant='contained' color='secondary'>Leave Channel</Button>
                    <Typography variant='h6'>
                        Active Devs
                        </Typography>
                    <div>
                        <ChannelUsers channelId={ channel.id } />
                    </div>

                </Grid>
                <Grid item xs={ 12 } md={ 6 }>
                    <CChat channelId={ channel.id } />
                </Grid>
            </Grid> : null }
        </div>
    );
};

export default CChannel;
