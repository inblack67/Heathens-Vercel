import { FC } from 'react';
import { createStyles, makeStyles, Theme, Paper, Grid, Divider, Typography, Container, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ChannelUsers from './ChannelUsers';
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { ChannelEntity, useLeaveChannelMutation, UserEntity } from "../src/generated/graphql";
import { snackbarState } from '../src/recoil/state';

const useStyles = makeStyles((theme: Theme) => createStyles({
    messageArea: {
        height: '80vh',
        overflowY: 'auto',
    },
    chatSection: {
        maxWidth: '100%',
        height: '100%',
        background: '#161710',
        border: `1px solid ${ theme.palette.primary.main }`
    },
    verticalMargin: {
        margin: '1rem 0 1rem 0'
    },
    noData: {
        marginTop: '1rem'
    },
    alert: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

interface ICChannelBox {
    channel: { __typename?: "ChannelEntity"; } & Pick<ChannelEntity, "desc" | "id" | "name"> & { users?: ({ __typename?: "UserEntity"; } & Pick<UserEntity, "id" | "username">)[]; };
}


const Chat: FC<ICChannelBox> = ({ channel }) => {

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
            <Grid container component={ Paper } className={ classes.chatSection }>
                <Grid item xs={ 12 }>
                    <Container>
                        <div className={ classes.messageArea }>
                            <Alert className={ `${ classes.noData } ${ classes.alert }` } severity='info'>
                                Channel Details
                            </Alert>
                            <Typography variant='h5' color='secondary'>
                                { channel.name }
                            </Typography>
                            <Button onClick={ fireLeaveChannel } className={ classes.verticalMargin } variant='contained' color='secondary'>Leave Channel</Button>
                            <Typography variant='h6'>
                                Active Devs
                            </Typography>
                            <div>
                                <ChannelUsers channelId={ channel.id } />
                            </div>
                        </div>
                    </Container>
                </Grid>
            </Grid>
        </div >
    );
};

export default Chat;
