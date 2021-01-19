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

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3rem'
    },
    drawerPaper: {
        width: drawerWidth,
        background: 'rgb(3, 14, 24)',
    },
    current: {
        color: theme.palette.secondary.main
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
    verticalMargin: {
        margin: '1rem 0 1rem 0'
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
// import { FC, useEffect, useState } from "react";
// import Preloader from "../components/Preloader";
// import { useGetChannelsQuery, useGetMyChannelQuery, useJoinChannelMutation } from "../src/generated/graphql";
// import { List, ListItem, makeStyles, createStyles, Theme, ListItemText, ListItemIcon, Container, Button, Grid } from "@material-ui/core";
// import { useRecoilState } from "recoil";
// import { snackbarState } from "../src/recoil/state";
// import Layout from "../components/Layout";
// import { useRouter } from "next/router";
// import { withApolloAuth } from "../src/apollo/auth";
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme: Theme) => createStyles({
//     root: {
//         maxWidth: 345,
//     },
//     drawerPaper: {
//         width: drawerWidth,
//         // background: theme.palette.primary.main,
//         background: '#2D343D',
//     },
//     channel: {

//     },
//     channelCard: {

//     },
//     channelList: {
//         marginTop: '1rem'
//     },
//     channelItemContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     channelItem: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'red'
//     },
//     textCenter: {
//         textAlign: 'center'
//     },
//     current: {
//         color: theme.palette.secondary.main
//     },
//     channelContainer: {
//         marginTop: '3rem',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// }));

// interface ICChannels {
// }

// const CChannels: FC<ICChannels> = () => {
//     const router = useRouter();

//     const { data, error, loading } = useGetChannelsQuery();
//     const getMyChannelRes = useGetMyChannelQuery();

//     const classes = useStyles();

//     const [ channelId, setChannelId ] = useState<number>(null);

//     const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

//     const [ joinChannel ] = useJoinChannelMutation();

//     useEffect(() => {
//         if (!getMyChannelRes.loading && getMyChannelRes.data) {
//             router.replace('/dashboard');
//         }
//     });

//     useEffect(() => {
//         if (error) {
//             setSnackbar({
//                 ...snackbar,
//                 isActive: true,
//                 message: error.message,
//                 severity: {
//                     ...snackbar.severity,
//                     type: 'error'
//                 }
//             });
//         }
//     }, [ error ]);

//     const handleChannelClick = (channelId: number, name: string) => () => {
//         setChannelId(channelId);
//         joinChannel({
//             variables: {
//                 channelId
//             }
//         }).then(() => {
//             setSnackbar({
//                 ...snackbar,
//                 isActive: true,
//                 message: 'Channel Joined!',
//                 severity: {
//                     ...snackbar.severity,
//                     type: 'info'
//                 }
//             });

//             router.push('/dashboard');

//         }).catch(err => console.error(err));
//     };

//     if (loading) {
//         return <Preloader />;
//     }

//     return (
//         <Layout>
//             <Container>
//                 <Button variant='contained' color='secondary'>
//                     Channels
//                 </Button>
//                 <Grid container spacing={ 8 }>
//                     { data && data.getChannels.length > 0 ? data.getChannels.map(channel => <Card key={ channel.id } className={ classes.root }>
//                         <Grid item xs={ 12 } md={ 6 }>
//                             <CardActionArea>
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h5" component="h2">
//                                         { channel.name }
//                                     </Typography>
//                                     <Typography variant="body2" color="textSecondary" component="p">
//                                         { channel.desc }
//                                     </Typography>
//                                 </CardContent>
//                             </CardActionArea>
//                             <CardActions>
//                                 <Button variant='contained' color="primary">
//                                     Join
//                         </Button>
//                             </CardActions>
//                         </Grid>
//                     </Card>) : <Button variant='contained' color='secondary'>
//                             No Channels Yet</Button> }
//                 </Grid>
//                 {/* <List className={ classes.channelList }>
//                     <Grid container spacing={ 8 }>
//                         { data && data.getChannels.length > 0 ? data.getChannels.map((channel) => (
//                             <Grid item xs={ 12 } md={ 6 }>
//                                 <ListItem className={ classes.channelItem } onClick={ handleChannelClick(channel.id, channel.name) } disabled={ channel.id === channelId } button key={ channel.id }>
//                                     <div className={ classes.channelItemContainer }>
//                                         <ListItemIcon className={ channel.id === channelId ? classes.current : null }><DevicesIcon /></ListItemIcon>
//                                         <ListItemText className={ channel.id === channelId ? classes.current : null } >
//                                             { channel.name }
//                                         </ListItemText>
//                                     </div>
//                                 </ListItem>
//                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore rem aspernatur ullam, quo quidem dolorem placeat laudantium, tenetur quasi quaerat, non voluptate! Cum animi vitae commodi esse odit ipsa maiores? Minus ab inventore vitae corporis quae voluptatum reprehenderit, perspiciatis dolorum modi delectus voluptatem dignissimos adipisci placeat eius nesciunt. Nemo, expedita?
//                             </Grid>
//                         )) : <Button variant='contained' color='secondary'>
//                                 No channels yet
//                 </Button> }
//                     </Grid>
//                 </List> */}
//             </Container>
//         </Layout>
//     );
// };

// export default withApolloAuth({ ssr: false })(CChannels);
