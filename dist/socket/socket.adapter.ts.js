"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const corsOptions = {
            origin: ['https://academy-manager.vercel.app', 'http://localhost:3000', 'https://academy-manager-be.vercel.app'],
            methods: ['GET', 'POST'],
            credentials: true,
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        };
        const server = super.createIOServer(port, { ...options, cors: corsOptions });
        return server;
    }
}
exports.SocketAdapter = SocketAdapter;
//# sourceMappingURL=socket.adapter.ts.js.map