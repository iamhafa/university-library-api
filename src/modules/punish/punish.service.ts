import { Injectable } from '@nestjs/common';
import { CreatePunishDto } from './dto/create-punish.dto';
import { UpdatePunishDto } from './dto/update-punish.dto';

@Injectable()
export class PunishService {
  create(createPunishDto: CreatePunishDto) {
    return 'This action adds a new punish';
  }

  findAll() {
    return `This action returns all punish`;
  }

  findOne(id: number) {
    return `This action returns a #${id} punish`;
  }

  update(id: number, updatePunishDto: UpdatePunishDto) {
    return `This action updates a #${id} punish`;
  }

  remove(id: number) {
    return `This action removes a #${id} punish`;
  }
}
