import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CustomAppModule } from 'src/custom-app/custom-app.module';
import { ObjectModule } from 'src/object/object.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, CustomAppModule, ObjectModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
