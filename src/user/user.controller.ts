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
  UseInterceptors,
} from '@nestjs/common';
import { paramIdDecorator } from 'src/decorator/param-id-decorator';
import { LogInterceptor } from 'src/interceptor/log.interceptor';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch.user.dto';
import { UpdatePutUserDTO } from './dto/update-put.user.dto';
import { UserService } from './user.service';

@UseInterceptors(LogInterceptor) //usado aqui funciona em todas essas rotas
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //@UseInterceptors(LogInterceptor) //usado aqui funciona somente nesta rota
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@paramIdDecorator() id: number) {
    console.log({ id });
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePartial(id, body);
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
