import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
//Gateways are not instantiated until they are referenced in the providers array of an existing module.
@Module({
 imports: [],
 controllers: [],
 providers: [AppGateway],
})
export class AppModule {}
