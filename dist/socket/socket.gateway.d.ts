import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    handleChat(client: any, payload: any): void;
}
