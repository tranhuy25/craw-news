
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_NEW } from './constants';
import { Types } from 'mongoose';

@Schema({collection :DB_NEW})
export class news {
  @Prop()
  title: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'topics' }) // Thêm trường dữ liệu topic
  topic: Types.ObjectId; // Sử dụng kiểu ObjectId cho trường topic
}

export const NewsSchema = SchemaFactory.createForClass(news);
