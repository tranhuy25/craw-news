
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_NEW } from './constants';
import { Types } from 'mongoose';

@Schema({collection :DB_NEW})
export class news {

  @Prop()
  title: string;

  @Prop()
  link:string;

  @Prop()
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'topics' }) 
  topic: Types.ObjectId;
    static link: any;
}

export const NewsSchema = SchemaFactory.createForClass(news);
