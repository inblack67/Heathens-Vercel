import Head from 'next/head';
import { Fragment } from 'react';
import VariantDrawer from './VariantDrawer';

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Head>
                <meta charSet='utf-8' />
                <link rel='icon' href='./icons/poison.svg' />
                <meta name='description' content='Slack Clone' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta name='theme-color' content='#000000' />
                <meta
                    name='keywords'
                    content='Typescript, Typeorm, Typegraphql, Slack Clone, Next.js, GraphQL, Material-UI, SSR, React.JS, JavaScript, Recoil, Postgres, Node.JS, Express, SEO, PWA, Backend, Frontent, Full-Stack, Website, Realtime, inblack67, Aman Bhardwaj'
                />
                <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
                <meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
                <meta name='author' content='inblack67' />
                <link rel='apple-touch-icon' href='./icons/poison.svg' />
                <link rel='manifest' href='./manifest.json' />
                <title>Heathens</title>
            </Head>
            <VariantDrawer />
            { children }
        </Fragment>
    );
};


export default Layout;
