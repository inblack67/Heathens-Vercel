import { Container, Typography, Button, makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import { useGetMeQuery, useHelloQuery } from '../src/generated/graphql';
import { Fragment } from 'react';
import { AUTH_HOMEPAGE } from '../src/constants';
import { withApolloAuth } from '../src/apollo/auth';

const useStyles = makeStyles((_: Theme) => createStyles({
  root: {
    textAlign: 'center',
  },
  content: {
    marginTop: '6rem'
  }
}));

const CHome = () => {
  const classes = useStyles();
  const helloRes = useHelloQuery();
  const { data } = useGetMeQuery();

  console.log('helloRes = ', helloRes.data);

  return (
    <Layout>
      <div className={ classes.root }>
        <Container className={ classes.content }>
          <Grid container spacing={ 2 } justify='center'>
            { data && data.getMe ? <Fragment>
              <Grid item>
                <Typography variant='h6'>
                  Just because we check the guns at the door,
                  doesn't mean our brains will change from hand grenades.
                </Typography>
              </Grid>
              <Grid item>
                <NextLink href={ AUTH_HOMEPAGE } passHref>
                  <Button color='primary' variant='contained'>Home?</Button>
                </NextLink>
              </Grid>
            </Fragment> : <Fragment>
                <Grid item>
                  <Typography variant='h6'>We don't deal with outsiders very well.</Typography>
                </Grid>
                <Grid item>
                  <NextLink href='/login' passHref>
                    <Button color='primary' variant='contained'>Login</Button>
                  </NextLink>
                </Grid></Fragment> }
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};


export default withApolloAuth({ ssr: true })(CHome);


