import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
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