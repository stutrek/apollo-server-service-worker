import { ApolloServerBase } from 'apollo-server-core';
import { graphQLServiceWorker } from './serviceWorkerApollo';
export class ApolloServer extends ApolloServerBase {
    installListener(path = '/graphql') {
        console.log('activated');
        self.addEventListener('fetch', (event) => {
            const { request } = event;
            const url = new URL(request.url);
            if (url.pathname !== path) {
                return;
            }
            event.respondWith(new Promise(async (resolve, reject) => {
                const options = await this.graphQLServerOptions({
                    req: request,
                });
                const response = await graphQLServiceWorker(request, options);
                resolve(response);
            }));
        });
    }
}
//# sourceMappingURL=ApolloServer.js.map