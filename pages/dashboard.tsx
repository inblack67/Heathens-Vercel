import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CChannel from '../components/CChannel';
import Layout from '../components/Layout';
import { withApolloAuth } from '../src/apollo/auth';
import { useGetMyChannelQuery } from "../src/generated/graphql";
import { snackbarState } from '../src/recoil/state';


const Dashboard = () => {
    const router = useRouter();
    const { loading, error, data } = useGetMyChannelQuery();
    const [ snackbar, setSnackbar ] = useRecoilState(snackbarState);

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
            if (error.message.toLocaleLowerCase().includes('none')) {
                router.replace('/channels');
            }
        }
    }, [ error ]);

    return (
        <Layout>
            { data ?
                <Container style={ { marginTop: '2rem' } }>
                    <CChannel channel={ data.getMyChannel } /> </Container> : null }
        </Layout>
    );
};


export default withApolloAuth({ ssr: false })(Dashboard);
