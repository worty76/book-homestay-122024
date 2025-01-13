import { PartialType } from '@nestjs/swagger';
import { CreatereviewDto } from './create-review.dto';

export class UpdatereviewDto extends PartialType(CreatereviewDto) {}
