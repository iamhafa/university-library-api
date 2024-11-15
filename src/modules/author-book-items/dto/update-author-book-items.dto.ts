import { PartialType } from '@nestjs/swagger';
import { CreateAuthorBookItemsDto } from './create-author-book-items.dto';

export class UpdateAuthorBookItemsDto extends PartialType(CreateAuthorBookItemsDto) {}
