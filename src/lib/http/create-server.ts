import http, { IncomingMessage, ServerResponse } from 'http';

export const createServer = (...middlewares: Middleware[]) => {
    return http.createServer(async (incomingMessage: IncomingMessage, serverResponse: ServerResponse) => {
        let requestContext: RequestContext = {
            statusCode: 200,
            closeConnection: false,
        };

        // 链式调用中间件
        for (const middleware of middlewares) {
            if (requestContext.closeConnection) {
                break;
            }

            // 兼容中间件是异步函数
            requestContext = await middleware(incomingMessage, requestContext);
        }

        serverResponse.writeHead(requestContext.statusCode);
        if (requestContext.responseBody != null) {
            serverResponse.end(requestContext.responseBody);
            return;
        }

        serverResponse.end();
    });
};
