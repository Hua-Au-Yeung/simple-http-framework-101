import { IncomingMessage, ServerResponse } from 'http';

declare global {
    type Middleware = (incomingMessage: IncomingMessage, requestContext: RequestContext) => RequestContext;
    type Route = {
        method: string;
        pathname: string;
        controller: (incomingMessage: IncomingMessage, requestContext: RequestContext) => string;
    };
    type RequestContext = {
        statusCode: number;
        closeConnection: boolean;
        responseBody?: string;
        url?: URL;
        method?: string;
    };
}
export {};
