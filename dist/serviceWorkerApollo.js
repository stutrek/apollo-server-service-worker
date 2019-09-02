import { runHttpQuery } from 'apollo-server-core';
export async function graphQLServiceWorker(request, options) {
    if (!options) {
        throw new Error('Apollo Server requires options.');
    }
    try {
        const { graphqlResponse, responseInit } = await runHttpQuery([], {
            method: request.method.toUpperCase(),
            options,
            query: request.method === 'POST'
                ? await request.json()
                : JSON.parse(request.url.split('?')[1]),
            request: request,
        });
        const response = new Response(graphqlResponse);
        for (const [name, value] of Object.entries(responseInit.headers)) {
            response.headers.set(name, value);
        }
        return response;
    }
    catch (error) {
        if ('HttpQueryError' !== error.name) {
            throw error;
        }
        const response = new Response(error.message, {
            status: error.statusCode,
            statusText: error.statusText,
        });
        if (error.headers) {
            for (const [name, value] of Object.entries(error.headers)) {
                response.headers.set(name, value);
            }
        }
        return response;
    }
}
//# sourceMappingURL=serviceWorkerApollo.js.map