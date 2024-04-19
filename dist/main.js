"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const socket_adapter_ts_1 = require("./socket/socket.adapter.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useWebSocketAdapter(new socket_adapter_ts_1.SocketAdapter(app));
    app.enableCors({
        origin: ['https://academy-manager.vercel.app', 'http://localhost:3000', 'https://academy-manager-be.vercel.app'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map