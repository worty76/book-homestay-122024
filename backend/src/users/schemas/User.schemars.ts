import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RoleUserEnum } from "src/util/enum/user-enum";

@Schema({ timestamps: true, versionKey: false })
export class User {
    @Prop()
    username: String;

    @Prop({ required: true, unique: true })
    phone: number;

    @Prop({ required: true, unique: true })
    email: String;

    @Prop({ required: true })
    password: String;

    @Prop({
        type: String,  // Đảm bảo kiểu là String
        enum: Object.values(RoleUserEnum),  // Giới hạn các giá trị hợp lệ từ RoleUserEnum
        default: RoleUserEnum.USER,  // Giá trị mặc định
    })
    userRole: RoleUserEnum = RoleUserEnum.USER;
}

export const UserSchema = SchemaFactory.createForClass(User);
