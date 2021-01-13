import { createWithApollo } from "./withApollo";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from "next";
import Router from 'next/router';
import { HttpLink } from '@apollo/client/link/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

// const createAuthenticatedLink = () =>
// {
//     console.log( 'creating auth link' );
//     // server
//     if ( typeof window === 'undefined' )
//     {
//         const httpLink = new HttpLink( {
//             uri: `${ process.env.NEXT_PUBLIC_SERVER_URL }/graphql`,
//             credentials: 'include',
//         } );

//         return httpLink;
//     }

//     // client
//     else
//     {
//         const httpLink = new HttpLink( {
//             uri: `${ process.env.NEXT_PUBLIC_SERVER_URL }/graphql`,
//             credentials: 'include',
//         } );

//         const wsLink = new WebSocketLink( {
//             uri: `wss://${ process.env.NEXT_PUBLIC_SERVER_DOMAIN }/graphql`,
//             options: {
//                 reconnect: true,
//             },
//         } );

//         const splitLink = split(
//             ( { query } ) =>
//             {
//                 const definition = getMainDefinition( query );
//                 return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//             },
//             wsLink,
//             httpLink,
//         );
//         return splitLink;
//     }
// };

const createPublicLink = () =>
{
    console.log( 'creating public link' );
    const httpLink = new HttpLink( {
        uri: `${ process.env.NEXT_PUBLIC_SERVER_URL }/graphql`,
        credentials: 'include',
    } );

    return httpLink;
};

const createIsomorphicLink = ( _: NextPageContext ) =>
{
    if ( typeof window === 'undefined' )
    {
        const httpLink = new HttpLink( {
            uri: `${ process.env.NEXT_PUBLIC_SERVER_URL }/graphql`,
            credentials: 'include',
        } );

        return httpLink;
    }

    // client
    else
    {
        const httpLink = new HttpLink( {
            uri: `${ process.env.NEXT_PUBLIC_SERVER_URL }/graphql`,
            credentials: 'include',
        } );

        const wsLink = new WebSocketLink( {
            uri: `wss://${ process.env.NEXT_PUBLIC_SERVER_DOMAIN }/graphql`,
            options: {
                reconnect: true,
                lazy: true
            },
        } );

        const splitLink = split(
            ( { query } ) =>
            {
                const definition = getMainDefinition( query );
                return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
            },
            wsLink,
            httpLink,
        );
        return splitLink;
    }
};


const errorLink = onError( ( { graphQLErrors, networkError } ) =>
{
    if ( graphQLErrors )
    {
        graphQLErrors.map( ( { message, locations, path } ) =>
        {
            console.log( `[GraphQL error]: Message: ${ message }, Location: ${ locations }, Path: ${ path }` );
            if ( message === 'Not Authenticated' )
            {
            }
        } );
    }

    if ( networkError )
    {
        console.log( `[Network error]: ${ networkError }` );
    }
} );

const createClient = ( ctx: NextPageContext ) =>
{
    return new ApolloClient( {
        uri: `${ process.env.NEXT_PUBLIC_SERVER_URL }/graphql`,
        link: errorLink.concat( createIsomorphicLink( ctx ) ),
        credentials: "include",
        headers: {
            cookie:
                ( typeof window === "undefined" ? ( ctx && ctx.req?.headers.cookie ) : undefined ) ||
                "",
        },
        cache: new InMemoryCache(),
    } );
};

export const withApollo = createWithApollo( createClient );