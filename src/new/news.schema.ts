import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema({collection :News.name})
export class News {
  @Prop()
  title: string;

  @Prop()
  link: string;

  @Prop()
  content: string;
  
  @Prop()
  createdAt: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);
