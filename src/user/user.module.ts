import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
