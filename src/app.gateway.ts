import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger } from '@nestjs/common';
 import { Socket, Server } from 'socket.io';
 //@WebsocketGateway() declarator which gives us access to the socket.io functionality.
 //gateway is listening on the same port as the HTTP server, unless your app is not a web application, or you have changed the port manually.
 @WebSocketGateway({
   cors: {
     origin: '*',
   },
 })
 export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
 //handle websocket messages in controllers.
 //We make use of the instance in our handleMessage() function where we send data to all clients connected to the server using the emit() function.
 // The handleMessage() function is also decorated with @SubscribeMessage() which makes it listen to an event named msgToServer.
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
   this.server.emit('msgToClient', payload);
  }
 //OnGatewayInit, OnGatewayConnection and OnGatewayDisconnect which we use to log some key states of our application. 
 //For example, we log when a new client connects to the server or when a current client disconnects.
  afterInit(server: Server) {
   this.logger.log('Init');
  }
 
  handleDisconnect(client: Socket) {
   this.logger.log(`Client disconnected: ${client.id}`);
  }
 
  handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client.id}`);
  }
 }