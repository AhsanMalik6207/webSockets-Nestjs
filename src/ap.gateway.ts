import { Logger } from '@nestjs/common';
import { SubscribeMessage,
   WebSocketGateway,
   OnGatewayInit,
   WsResponse,
   OnGatewayConnection,
   OnGatewayDisconnect} from '@nestjs/websockets';
   import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ApGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {

  
  private logger:Logger = new Logger('ApGateway')
  afterInit(server: Server) {
    this.logger.log('initialized:');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
}
  handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`client connected: ${client.id}`);
  }


  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    // client.emit('msgToClient', text)
    
    return {event: 'msgToClient', data:text};
  }
}
