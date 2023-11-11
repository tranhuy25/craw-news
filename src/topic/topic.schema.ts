
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_TOPIC } from './constants';
import { Types } from 'mongoose';

@Schema({collection :DB_TOPIC})
export class topics {
  @Prop()
  name: string;

  @Prop()
  link: string;

  // parentName: string;
  @Prop({ type: Types.ObjectId, ref: 'mainTopics' })
  topic: Types.ObjectId; // Sử dụng kiểu ObjectId cho trường 

}

export const TopicSchema = SchemaFactory.createForClass(topics);
