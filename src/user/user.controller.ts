import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch.user.dto';
import { UpdatePutUserDTO } from './dto/update-put.user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { email, name }: CreateUserDTO) {
    return { email, name };
  }

  @Get()
  async findAll() {
    return { users: [] };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { method: 'patch', body, id };
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { method: 'put', body, id };
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
