import { FC, Fragment, useEffect, useRef } from 'react';
import { createStyles, makeStyles, Theme, Paper, Grid, Divider, Container, Fab, FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import SendIcon from '@material-ui/icons/Send';
import { useGetChannelMessagesQuery, usePostMessageMutation, NewMessageDocument, RemovedMessageDocument } from '../src/generated/graphql';
import { useForm } from 'react-hook-form';
import { useRecoilState } from "recoil";
import { snackbarState } from "../src/recoil/state";
import Preloader from "./Preloader";
import Messages from './Messages';
import { encryptMe } from '../src/encryption';

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
        border: `1px solid ${ theme.palette.primary.main }`
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
        color: theme.palette.success.main,
    },
    noData: {
        marginTop: '1rem'
    },
    alert: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadMore: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1rem 0 1rem 0'
    }
}));

interface ICChatBox {
    channelId: number;
}

interface IChatForm {
    content: string;
}

const Chat: FC<ICChatBox> = ({ channelId }) => {

    const { register, handleSubmit, errors, reset } = useForm<IChatForm>();

    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

    const { data, loading, subscribeToMore, fetchMore, variables } = useGetChannelMessagesQuery({
        variables: {
            channelId: channelId,
            limit: 10,
            cursor: null
        },
        fetchPolicy: 'network-only',
    });

    const [ postMessageMutation, { error } ] = usePostMessageMutation();

    const messageRef = useRef<HTMLDivElement>();

    // useEffect(() => {
    //     if (messageRef.current) {
    //         messageRef.current.scrollTop = messageRef.current.scrollHeight;
    //     }
    // });

    useEffect(() => {
        subscribeToMore({
            document: NewMessageDocument,
            variables: {
                channelId
            },
            updateQuery: (prev, res: any) => {
                if (!res.subscriptionData.data) {
                    return prev;
                }
                return {
                    ...prev,
                    getChannelMessages: {
                        ...prev.getChannelMessages,
                        messages: [ ...prev.getChannelMessages.messages, res.subscriptionData.data.newMessage ]
                    }
                };
            }
        });
    }, []);

    useEffect(() => {
        subscribeToMore({
            document: RemovedMessageDocument,
            variables: {
                channelId
            },
            updateQuery: (prev, res: any) => {
                if (!res.subscriptionData.data) {
                    return prev;
                }
                return {
                    ...prev,
                    getChannelMessages: {
                        ...prev.getChannelMessages,
                        messages: prev.getChannelMessages.messages.filter(mess => mess.id !== res.subscriptionData.data.removedMessage.id)
                    }
                };
            }
        });
    }, []);

    useEffect(() => {
        if (error) {
            setSnackbar({
                ...snackbar,
                isActive: true,
                severity: {
                    ...snackbar.severity,
                    type: 'error'
                },
                message: error.message
            });
        }
    }, [ error ]);

    const classes = useStyles();

    const postMessage = ({ content }: IChatForm) => {

        const encryptedContent = encryptMe(content);

        postMessageMutation({
            variables: {
                channelId,
                content: encryptedContent
            }
        }).then(() => {
            reset();
        }).catch(err => console.error(err));
    };

    const onFetchMoreMessages = () => {
        fetchMore({
            variables: {
                limit: variables.limit,
                cursor: data?.getChannelMessages.messages[ data.getChannelMessages.messages.length - 1 ].createdAt
            },
            updateQuery: (prev, res) => {
                if (!res.fetchMoreResult.getChannelMessages) {
                    return prev;
                }
                return {
                    ...prev,
                    getChannelMessages: {
                        ...prev.getChannelMessages,
                        messages: [ ...prev.getChannelMessages.messages, ...res.fetchMoreResult.getChannelMessages.messages ],
                        hasMore: res.fetchMoreResult.getChannelMessages.hasMore,
                    }
                };
            }
        });
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <div>
            <Grid container component={ Paper } className={ classes.chatSection }>
                <Grid item xs={ 12 }>
                    <Container>
                        <div ref={ messageRef } className={ classes.messageArea }>
                            <Alert className={ `${ classes.noData } ${ classes.alert }` } severity='success'>
                                Messages to this chat are end-to-end encrypted.
                            </Alert>
                            { data && data.getChannelMessages.messages.length > 0 ? <Fragment>
                                <Messages messages={ data.getChannelMessages.messages } />
                                { data.getChannelMessages.hasMore ?
                                    <div className={ classes.loadMore }>
                                        <Button onClick={ onFetchMoreMessages } color='secondary'>
                                            Load More Messages
                                        </Button>
                                    </div> : null }
                            </Fragment> : <div className={ classes.textCenter }>
                                    <Alert className={ `${ classes.noData } ${ classes.alert }` } severity='warning'>
                                        No messages yet.
                            </Alert> </div> }
                        </div>
                    </Container>
                    <Divider />
                    <form onSubmit={ handleSubmit(postMessage) }>
                        <Grid container className={ classes.form }>
                            <Grid item xs={ 11 }>
                                <FormControl fullWidth error={ errors.content ? true : false }>
                                    <InputLabel htmlFor="content">Type Some Markdown Already</InputLabel>
                                    <Input multiline rowsMax={ 3 } id="content" name='content' inputRef={ register({
                                        required: 'What\'s your hurry?',
                                    }) } />
                                    { errors.content ? <FormHelperText
                                        error
                                        id="content-helper-text">{ errors.content.message }
                                    </FormHelperText> : null }
                                </FormControl>
                            </Grid>
                            <Grid item xs={ 1 }>
                                <Fab type='submit' color="primary" aria-label="add"><SendIcon /></Fab>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div >
    );
};

export default Chat;
