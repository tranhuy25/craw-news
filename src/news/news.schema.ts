
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_NEW } from './constants';

@Schema({collection :DB_NEW})

export class news {

  @Prop()
  name: string;

  @Prop()
  link:string;
  
  @Prop()
  description:string;

  @Prop()
  createdAt: Date;

  @Prop()
  content: string;

}
export const NewsSchema = SchemaFactory.createForClass(news);
