import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createContactDto: CreateContactDto, @Req() req) {
    createContactDto.owner = req.user.id;
    return this.contactService.create(createContactDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req, @Query() query) {
    if (query.skip === undefined) query.skip = 0;
    if (query.take === undefined) query.skip = 25;

    return this.contactService.findAll(req.user.id, query.skip, query.take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
