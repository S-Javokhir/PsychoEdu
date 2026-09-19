import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RealtimeGateway.name);
  private roomViewers = new Map<string, Set<string>>();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    for (const [roomId, clients] of this.roomViewers.entries()) {
      if (clients.has(client.id)) {
        clients.delete(client.id);
        this.broadcastViewerCount(roomId);
      }
    }
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    client.join(data.roomId);
    if (!this.roomViewers.has(data.roomId)) {
      this.roomViewers.set(data.roomId, new Set());
    }
    this.roomViewers.get(data.roomId)!.add(client.id);
    this.broadcastViewerCount(data.roomId);
    return { status: 'joined', roomId: data.roomId };
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    client.leave(data.roomId);
    if (this.roomViewers.has(data.roomId)) {
      this.roomViewers.get(data.roomId)!.delete(client.id);
      this.broadcastViewerCount(data.roomId);
    }
    return { status: 'left', roomId: data.roomId };
  }

  private broadcastViewerCount(roomId: string) {
    const count = (this.roomViewers.get(roomId)?.size || 0) + 24; // Baseline student viewers for demo
    this.server.to(roomId).emit('viewer-count-updated', { roomId, viewerCount: count });
  }

  // Method to push notifications from services
  sendNotificationToUser(userId: string, notification: any) {
    this.server.emit(`notification:${userId}`, notification);
  }
}
