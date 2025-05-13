import { PartialType } from '@nestjs/swagger';
import { CreateFineTicketDto } from './create-fine-ticket.dto';

export class UpdateFineTicketDto extends PartialType(CreateFineTicketDto) {}
