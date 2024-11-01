import { PartialType } from '@nestjs/swagger';
import { CreatePunishDto } from './create-punish.dto';

export class UpdatePunishDto extends PartialType(CreatePunishDto) {}
