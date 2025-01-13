import { PartialType } from '@nestjs/swagger';
import { CreatehomestayDto } from './create-homestay.dto';

export class UpdatehomestayDto extends PartialType(CreatehomestayDto) {}
