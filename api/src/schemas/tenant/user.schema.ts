import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const USER_MODEL_NAME = 'User';
export type UserDocument = _User & Document;

@Schema({ collection: USER_MODEL_NAME })
class _User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  resetCode: string;
}

export const UserSchema = SchemaFactory.createForClass(_User);
