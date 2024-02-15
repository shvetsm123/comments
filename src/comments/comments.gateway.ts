import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: '*' } })
export class CommentsGateway implements OnGatewayConnection {
  @SubscribeMessage('server-path')
  handleEvent(
    @MessageBody() payload: any,
    @ConnectedSocket() client: any,
  ): void {
    client.emit('client-path', payload);
  }

  handleConnection(client) {
    console.log(client);
    console.log('connected2');
  }
}
