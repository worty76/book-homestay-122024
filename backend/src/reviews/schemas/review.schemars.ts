import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Types } from "mongoose";

@Schema({ timestamps: true, versionKey: false })
export class review {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    readonly user_id: ObjectId;
    @Prop({ type: Types.ObjectId, ref: 'Homestay' })
    readonly homestay_id: ObjectId;
    @Prop({required: true})
    rating: number;
    @Prop({required: true})
    comment: string;
}

export const reviewSchema = SchemaFactory.createForClass(review);
