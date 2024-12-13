import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    username: String;
    @Prop({required: true,unique: true})
    phone: number;
    @Prop({required: true,unique: true})
    email: String;
    @Prop({required: true})
    password: String;
}
export const UserSchema = SchemaFactory.createForClass(User);