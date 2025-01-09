import { IncomingMessage } from 'http';

export const url = () => {
    return (incomingMessage: IncomingMessage, requestContext: RequestContext): RequestContext => {
        console.debug(`request: ${incomingMessage.method} ${incomingMessage.url}`);

        requestContext.url = new URL(incomingMessage.url as string, `http://${incomingMessage.headers.host}`);
        requestContext.method = incomingMessage.method;
        return requestContext;
    };
};

export const router = (...routes: Route[]) => {
    return (incomingMessage: IncomingMessage, requestContext: RequestContext): RequestContext => {
        // 匹配到正确的route，否则返回404
        for (const route of routes) {
            if (route.pathname !== (requestContext.url as URL).pathname) continue;
            if (route.method !== requestContext.method) continue;

            requestContext.responseBody = route.controller(incomingMessage, requestContext);
            requestContext.closeConnection = true;

            return requestContext;
        }

        return {
            ...requestContext,
            statusCode: 404,
            responseBody: '<h1>404 Not Found</h1>\n',
        } as RequestContext;
    };
};
