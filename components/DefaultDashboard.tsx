import { Grid, Typography, Container, makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    root: {
        marginTop: '2rem'
    }
} ) );

const DefaultDashboard = () =>
{

    const classes = useStyles();

    return (
        <Container className={ classes.root }>
            <Typography align='center' color='secondary' variant='h5'>
                Channels
            </Typography>
            <Grid container justify='center'>
                <Grid item>
                    DefaultDashboard
                </Grid>
            </Grid>
        </Container>
    );
};

export default DefaultDashboard;
