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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ObjectId } from 'mongodb';
import { AuthGuard } from 'src/auth/auth.guard';
// import { AppAssociationService } from './app-association.service';
import { CustomAppService } from './custom-app.service';
import { AppAssociationDto } from './dto/app-association.dto';
import { CreateCustomAppDto } from './dto/create-custom-app.dto';
import { UpdateCustomAppDto } from './dto/update-custom-app.dto';

@ApiTags('custom-app')
@Controller('custom-app')
export class CustomAppController {
  constructor(
    private readonly customAppService: CustomAppService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCustomAppDto: CreateCustomAppDto, @Req() req) {
    createCustomAppDto.owner = req.user.id;
    createCustomAppDto.associations = [];
    createCustomAppDto.isDefault = false;

    return this.customAppService.create(createCustomAppDto);
  }

  
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.customAppService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customAppService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomAppDto: UpdateCustomAppDto,
  ) {
    return this.customAppService.update(id, updateCustomAppDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customAppService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/association')
  createAssociation(
    @Param('id') id: string,
    @Body() appAssociationDto: AppAssociationDto,
  ) {
    const appId = new ObjectId(id);
    const objectId = appAssociationDto.object;

    return this.customAppService.createAssociation(appId, objectId);
  }

  // @UseGuards(AuthGuard)
  // @Patch(':id/association')
  // updateAssociation(
  //   @Param('id') id: string,
  //   @Body() updateAppAssociationDto: UpdateAppAssociationDto,
  // ) {
  //   console.log(id);
  //   updateAppAssociationDto.appId = new ObjectId(id);
  //   return this.appAssociationService.update(updateAppAssociationDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id/association')
  deleteAssociation(
    @Param('id') id: string,
    @Body() appAssociationDto: AppAssociationDto,
  ) {
    const appId = new ObjectId(id);
    const objectId = appAssociationDto.object;

    return this.customAppService.removeAssociation(appId, objectId);
  }

}
