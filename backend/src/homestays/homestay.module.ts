import { Module } from '@nestjs/common';
import { homestayService } from './homestay.service';
import { homestayController } from './homestay.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Homestay, HomestaySchema} from 'src/homestays/schemas/homestay.schemars';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Homestay.name,
    schema: HomestaySchema,
  }])],
  controllers: [homestayController],
  providers: [homestayService],
})
export class HomestayModule {}
