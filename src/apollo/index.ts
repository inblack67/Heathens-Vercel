import { createWithApollo } from "./withApollo";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from "next";
import { HttpLink } from '@apollo/client/link/http';
import { onError } from '@apollo/client/link/error';

const createPublicLink = () =>
{
    console.log( 'creating public link' );
    const httpLink = new HttpLink( {
        uri: `${ process.env.NEXT_PUBLIC_SERVER_URL }/graphql`,
        credentials: 'include',
    } );

    return httpLink;
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
        link: errorLink.concat( createPublicLink() ),
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