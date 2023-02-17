import { Module } from '@nestjs/common';
import { CustomAppService } from './custom-app.service';
import { CustomAppController } from './custom-app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CustomApp } from './entities/custom-app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectModule } from 'src/object/object.module';
import { ObjectService } from 'src/object/object.service';
// import { AppAssociation } from './entities/app-association.entity';
// import { AppAssociationService } from './app-association.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomApp]), AuthModule, ObjectModule],
  controllers: [CustomAppController],
  providers: [CustomAppService],
  exports: [CustomAppService]
})
export class CustomAppModule {}
