import { createStyles, Grid, List, ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { FC, useEffect, useRef } from "react";
import { RenderMarkdown } from 'use-syntaxer';
import { useRecoilValue } from 'recoil';
import { authState } from '../src/recoil/state';
import { MessageEntity, UserEntity } from "../src/generated/graphql";

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    messageArea: {
        height: '65vh',
        overflowY: 'auto',
    },
    form: {
        padding: '1rem 2rem 0.5rem 2rem'
    },
    chatSection: {
        maxWidth: '100%',
        height: '100%',
        background: '#161710',
        border: '1px solid red'
    },
    textRight: {
        textAlign: 'right'
    },
    textLeft: {
        textAlign: 'left'
    },
    textCenter: {
        textAlign: 'center'
    },
    textSecondary: {
        color: theme.palette.secondary.main
    },
    textPrimary: {
        color: theme.palette.primary.main
    },
    message: {
        textAlign: 'justify'
    },
    current: {
        color: 'red',
    }
} ) );

interface IMessages
{
    messages: ( { __typename?: "MessageEntity"; } & Pick<MessageEntity, "content" | "id" | "createdAt"> & { poster: { __typename?: "UserEntity"; } & Pick<UserEntity, "id" | "username">; } )[],
}

const Messages: FC<IMessages> = ( { messages } ) =>
{
    const classes = useStyles();
    const auth = useRecoilValue( authState );

    return (
        <List>
            {messages.map( message => <ListItem key={ message.id }>
                <Grid container >
                    <Grid item xs={ 12 }>
                        <ListItemText className={ classes.message }>
                            <RenderMarkdown code={ message.content } />
                        </ListItemText>
                    </Grid>
                    <Grid item xs={ 12 }>
                        { auth && auth.id === message.poster.id ? <ListItemText className={ classes.current }>
                            ~ { message.poster.username }
                        </ListItemText> : <ListItemText secondary={ `~ ${ message.poster.username }` } /> }
                    </Grid>
                </Grid>
            </ListItem> ) }
        </List> );
};

export default Messages;
