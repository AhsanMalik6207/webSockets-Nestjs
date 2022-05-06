import { Module } from '@nestjs/common';
import { ApGateway } from './ap.gateway';


@Module({
  imports: [],
  controllers: [],
  providers: [ApGateway],
})
export class AppModule {}
