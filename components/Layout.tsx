import Head from 'next/head';
import { Fragment } from 'react';
import VariantDrawer from './VariantDrawer';

const Layout = ( { children } ) =>
{
    return (
        <Fragment>
            <Head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta
                    name='viewport'
                    content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
                />
                <meta name='description' content='realt time chat app' />
                <meta name='keywords' content='amoeba' />
                <title>Heathens</title>
                <meta name='theme-color' content='#000' />
            </Head>
            <VariantDrawer />
            { children }
        </Fragment>
    );
};


export default Layout;
