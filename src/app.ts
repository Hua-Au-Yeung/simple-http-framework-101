import { createServer } from './lib/http/create-server.js';
import { get } from './lib/http/methods/index.js';
import { router, url } from './lib/http/middlewares/index.js';

const server = createServer(
    // 中间件
    url(),
    router(
        get('/', () => {
            return 'Hello, World!\n';
        }),
    ),
);

server.listen(6000);
