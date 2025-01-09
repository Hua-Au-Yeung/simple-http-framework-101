import { IncomingMessage } from 'http';

declare global {
    interface Middleware {
        (incomingMessage: IncomingMessage, requestContext: RequestContext): RequestContext;
    }

    interface Route {
        method: string;
        pathname: string;
        controller: (incomingMessage: IncomingMessage, requestContext: RequestContext) => string;
    }

    interface RequestContext {
        statusCode: number;
        closeConnection: boolean;
        responseBody?: string;
        url?: URL;
        method?: string;
    }
}
export {};
