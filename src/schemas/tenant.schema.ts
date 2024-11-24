import { Schema, Document } from 'mongoose';

export interface TenantDocument extends Document {
  id: string;
  name: string;
  domain: string;
  isActive: boolean;
  createdAt: Date;
}

export const TenantSchema = new Schema<TenantDocument>({
  name: { type: String, unique: true, required: true },
  domain: { type: String, unique: true, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
