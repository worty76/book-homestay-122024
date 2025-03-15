import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, versionKey: false })
export class Homestay {
    @Prop({ required: true, Unique: true })
    name: string;

    @Prop({ required: true, Unique: true} )
    location: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price_per_night: number;

    @Prop({ required: true })
    available_rooms: number;

    @Prop({ type: [String] })
    images: string[];
}

export const HomestaySchema = SchemaFactory.createForClass(Homestay);
