import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch.user.dto';
import { UpdatePutUserDTO } from './dto/update-put.user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, password, birthAt }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: number,
    { email, name, password, birthAt }: UpdatePatchUserDTO,
  ) {
    const data: any = {};
    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      data.password = password;
    }

    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async update(
    id: number,
    { email, name, password, birthAt }: UpdatePutUserDTO,
  ) {
    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: { id },
    });
  }

  async delete(id) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
