import React, { FC, useEffect } from 'react';
import { createStyles, Theme, makeStyles, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { useGetChannelUsersQuery, JoinedChannelDocument, LeftChannelDocument } from '../src/generated/graphql';
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

    useEffect(() => {
        const unsub1 = subscribeToMore({
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

        return () => {
            return unsub1();
        };
    }, []);

    useEffect(() => {
        const unsub2 = subscribeToMore({
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

        return () => {
            unsub2();
        };
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <List >
            {data && data.getChannelUsers.length > 0 ? data.getChannelUsers.map(user => <ListItem className={ clsx(classes.root, classes.verticalMargin) } key={ user.id }>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={ user.username } />
            </ListItem>) : <Typography align='center' variant='h6' color='secondary'>
                    No users yet</Typography> }
        </List>
    );
};


export default ChannelUsers;
