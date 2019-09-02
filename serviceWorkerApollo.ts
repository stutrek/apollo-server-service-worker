import { GraphQLOptions, HttpQueryError, runHttpQuery } from 'apollo-server-core';

import { Request as ApolloRequest } from 'apollo-server-env';

export async function graphQLServiceWorker(request: Request, options: GraphQLOptions) {
    if (!options) {
        throw new Error('Apollo Server requires options.');
    }

    if (arguments.length > 1) {
        // TODO: test this
        throw new Error(`Apollo Server expects exactly one argument, got ${arguments.length}`);
    }

    try {
        const { graphqlResponse, responseInit } = await runHttpQuery([], {
            method: request.method.toUpperCase(),
            options,
            query:
                request.method === 'POST' ? request.json() : JSON.parse(request.url.split('?')[1]),
            request: (request as unknown) as ApolloRequest,
        });

        const response = new Response(graphqlResponse);

        for (const [name, value] of Object.entries(responseInit.headers)) {
            response.headers.set(name, value as string);
        }
        return response;
    } catch (error) {
        if ('HttpQueryError' !== error.name) {
            throw error;
        }
        const response = new Response(error.message, {
            status: error.statusCode,
            statusText: error.statusText,
        });

        if (error.headers) {
            for (const [name, value] of Object.entries(error.headers)) {
                response.headers.set(name, value as string);
            }
        }
        return response;
    }
}
