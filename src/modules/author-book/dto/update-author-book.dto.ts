import { PartialType } from '@nestjs/swagger';
import { CreateAuthorBookDto } from './create-author-book.dto';

export class UpdateAuthorBookDto extends PartialType(CreateAuthorBookDto) {}
