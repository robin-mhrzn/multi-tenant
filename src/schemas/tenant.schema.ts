import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenantDocument = _Tenant & Document;
@Schema()
class _Tenant {
  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TenantSchema = SchemaFactory.createForClass(_Tenant);
