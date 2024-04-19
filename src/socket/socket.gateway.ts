import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    // Xử lý khi một client kết nối
  }

  handleDisconnect(client: any) {
    // Xử lý khi một client ngắt kết nối
  }
 
  @SubscribeMessage('chat')
  handleChat(client: any, payload: any): void {
    // Xử lý tin nhắn chat và gửi lại cho tất cả các client khác
    this.server.emit('chat', payload);
  }
}