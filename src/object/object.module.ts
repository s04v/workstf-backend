import { Module, forwardRef } from '@nestjs/common';
import { ObjectService } from './object.service';
import { ObjectController } from './object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CustomObject } from './entities/object.entity';
import { FieldService } from './field.service';
import { Record } from './entities/record.entity';
import { RecordService } from './record.service';
import { CustomAppModule } from 'src/custom-app/custom-app.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomObject, Record]),
    AuthModule,
    forwardRef(() => CustomAppModule),
  ],
  controllers: [ObjectController],
  providers: [ObjectService, RecordService, FieldService],
  exports: [ObjectService],
})
export class ObjectModule {}
