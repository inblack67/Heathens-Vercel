import { createStyles, Grid, List, ListItem, ListItemText, makeStyles, Theme, IconButton } from "@material-ui/core";
import { FC } from "react";
import { RenderMarkdown } from 'use-syntaxer';
import { decryptMe } from "../src/encryption";
import { MessageEntity, useDeleteMessageMutation, useGetMeQuery, UserEntity } from "../src/generated/graphql";
import Preloader from "./Preloader";
import DeleteIcon from '@material-ui/icons/Delete';
import { snackbarState } from "../src/recoil/state";
import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme: Theme) => createStyles({
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
        // textAlign: 'justify',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    current: {
        color: theme.palette.primary.light,
    },
    delete: {
        color: theme.palette.secondary.main
    }
}));

interface IMessages {
    messages: ({ __typename?: "MessageEntity"; } & Pick<MessageEntity, "content" | "id" | "createdAt"> & { poster: { __typename?: "UserEntity"; } & Pick<UserEntity, "id" | "username">; })[],
}

const Messages: FC<IMessages> = ({ messages }) => {

    const classes = useStyles();
    const { data, loading } = useGetMeQuery();
    const [ deleteMessage ] = useDeleteMessageMutation();
    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const handleClick = (id: number) => () => {
        deleteMessage({
            variables: {
                id
            }
        }).then(() => {
            setSnackbar({
                ...snackbar,
                isActive: true,
                severity: {
                    ...snackbar.severity,
                    type: 'success'
                },
                message: 'Message Deleted!'
            });
        }).catch(err => {
            console.error(err);
        });
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <List>
            {messages.map(message => <ListItem key={ message.id }>
                <Grid container >
                    <Grid item xs={ 12 } className={ classes.message }>
                        <ListItemText>
                            <RenderMarkdown code={ decryptMe(message.content) } />
                        </ListItemText>
                        { data && data.getMe.id === message.poster.id ? <IconButton onClick={ handleClick(message.id) }>
                            <DeleteIcon className={ classes.delete } />
                        </IconButton> : null }
                    </Grid>
                    <Grid item xs={ 12 }>
                        { data && data.getMe.id === message.poster.id ? <ListItemText className={ classes.current }>
                            ~ { message.poster.username }
                        </ListItemText> : <ListItemText secondary={ `~ ${ message.poster.username }` } /> }
                    </Grid>
                </Grid>
            </ListItem>) }
        </List>);
};

export default Messages;
