import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { FieldService } from './field.service';
import { ObjectId } from 'mongodb';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Controller('object')
export class ObjectController {
  constructor(
    private readonly objectService: ObjectService,
    private readonly fieldService: FieldService,
    private readonly recordService: RecordService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createObjectDto: CreateObjectDto, @Req() req) {
    createObjectDto.owner = req.user.id;
    return this.objectService.create(createObjectDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.objectService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':appName')
  findAllByAppName(@Req() req, @Param('appName') appName: string) {
    return this.objectService.findAllByAppName(req.user.id, appName);
  }

  // @UseGuards(AuthGuard)
  // @Patch(':appName/:id')
  // update(
  //   @Req() req,
  //   @Param('id') id: string,
  //   @Body() updateObjectDto: UpdateObjectDto,
  // ) {
  //   return this.objectService.update(req.user.id, id, updateObjectDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':appName/:id')
  remove(@Req() req, @Param('id') id: string) {
    return this.objectService.remove(req.user.id, id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/field')
  createField(@Body() createFieldDto: CreateFieldDto, @Param('id') id: string) {
    return this.fieldService.create(id, createFieldDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/field')
  updateField(@Body() updateFieldDto: UpdateFieldDto, @Param('id') id: string) {
    return this.fieldService.update(id, updateFieldDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/field/:fieldId')
  deleteField(@Param('id') id: string, @Param('fieldId') fieldId: string) {
    return this.fieldService.delete(id, fieldId);
  }

  @UseGuards(AuthGuard)
  @Get(':objectId/record')
  findAllRecords(@Param('objectId') objectId: string, @Query() query) {
    if (query.skip === undefined) query.skip = 0;
    if (query.take === undefined) query.skip = 25;

    return this.recordService.findAll(objectId, query.skip, query.take);
  }

  @UseGuards(AuthGuard)
  @Post(':objectId/record')
  createRecord(
    @Param('objectId') objectId: string,
    @Body() createRecordDto: CreateRecordDto,
  ) {
    return this.recordService.create(objectId, createRecordDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':objectId/record')
  updateRecord(
    @Param('objectId') objectId: string,
    @Body() updateRecordDto: UpdateRecordDto,
  ) {
    return this.recordService.update(objectId, updateRecordDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':objectId/record/:id')
  removeRecord(@Param('objectId') objectId: string, @Param('id') id: string) {
    return this.recordService.remove(objectId, id);
  }

  @UseGuards(AuthGuard)
  @Get(':appname/:id')
  findById(@Req() req, @Param('id') id: string) {
    return this.objectService.findOne(req.user.id, id);
  }
}
