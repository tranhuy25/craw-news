
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_NEW } from './constants';

@Schema({collection :DB_NEW})

export class news {

  @Prop()
  title: string;

  @Prop()
  link:string;
  
  @Prop()
  description:string;

  @Prop()
  createdAt: string;

  @Prop()
  content: string;

  @Prop()
  thumbnail : string;

}
export const NewsSchema = SchemaFactory.createForClass(news);
