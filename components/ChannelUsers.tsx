import React, { FC, useEffect } from 'react';
import { createStyles, Theme, makeStyles, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { useGetChannelUsersQuery, JoinedChannelDocument, LeftChannelDocument, useGetMeQuery } from '../src/generated/graphql';
import Preloader from './Preloader';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        verticalMargin: {
            margin: '0.5rem 0 0.5rem 0'
        },
        blackBg: {
            backgroundColor: 'black'
        },
        primaryBg: {
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        },
        secondaryBg: {
            backgroundColor: theme.palette.secondary.main,
            color: 'white'
        }
    }),
);

interface IUsers {
    channelId: number;
}

const ChannelUsers: FC<IUsers> = ({ channelId }) => {
    const classes = useStyles();
    const { loading, error, data, subscribeToMore } = useGetChannelUsersQuery({
        variables: {
            channelId
        },
        fetchPolicy: 'network-only'
    });
    const getMeRes = useGetMeQuery();

    useEffect(() => {
        subscribeToMore({
            document: JoinedChannelDocument,
            variables: {
                channelId
            },
            updateQuery: (prev, res: any) => {
                if (!res.subscriptionData.data) {
                    return prev;
                }
                const joinedUser = res.subscriptionData.data.joinedChannel;
                return {
                    ...prev,
                    getChannelUsers: [ ...prev.getChannelUsers, joinedUser ]
                };
            }
        });
    }, []);

    useEffect(() => {
        subscribeToMore({
            document: LeftChannelDocument,
            variables: {
                channelId
            },
            updateQuery: (prev, res: any) => {
                if (!res.subscriptionData.data) {
                    return prev;
                }
                const leftUser = res.subscriptionData.data.leftChannel;
                return {
                    ...prev,
                    getChannelUsers: prev.getChannelUsers.filter(user => user.id !== leftUser.id)
                };
            }
        });
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <List >
            {data && data.getChannelUsers.length > 0 ? data.getChannelUsers.map(user => <ListItem className={ clsx(classes.root, classes.verticalMargin, classes.blackBg) } key={ user.id }>
                <ListItemAvatar>
                    <Avatar className={ getMeRes.data && getMeRes.data.getMe.id === user.id ? classes.primaryBg : classes.secondaryBg }>
                        <CodeIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={ user.username } />
            </ListItem>) : <Typography align='center' variant='h6' color='secondary'>
                    No users yet</Typography> }
        </List>
    );
};


export default ChannelUsers;
