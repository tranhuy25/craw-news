
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Topic {
  @Prop()
  name: string;

  @Prop()
  link: string;

}

export const TopicSchema = SchemaFactory.createForClass(Topic);
