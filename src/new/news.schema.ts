import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema()
export class News {
  @Prop()
  title: string;

  @Prop()
  link: string;

  @Prop()
  content: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
