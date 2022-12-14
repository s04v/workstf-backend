import { Module } from '@nestjs/common';
import { ObjectService } from './object.service';
import { ObjectController } from './object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CustomObject } from './entities/object.entity';
import { FieldService } from './field.service';
import { Record } from './entities/record.entity';
import { RecordService } from './record.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomObject, Record]), AuthModule],
  controllers: [ObjectController],
  providers: [ObjectService, FieldService, RecordService],
})
export class ObjectModule {}
