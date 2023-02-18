import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CustomAppModule } from 'src/custom-app/custom-app.module';
import { ObjectModule } from 'src/object/object.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ObjectModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CustomAppModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
