import { execSync } from 'child_process';
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
        get('/ping', () => {
            const out = execSync(`ping -c 1 www.baidu.com`);
            return out.toString();
        }),
    ),
);

server.listen(6000);
