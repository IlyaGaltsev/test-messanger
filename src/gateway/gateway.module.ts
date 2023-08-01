import { Module } from '@nestjs/common'
import { GatewayController } from './gateway.controller'

@Module({
  providers: [GatewayController]
})
export class GatewayModule {}
