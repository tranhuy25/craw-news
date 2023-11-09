
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MainTopic {
  @Prop()
  name: string;

  @Prop()
  link: string;

}
export const MainTopicSchema = SchemaFactory.createForClass(MainTopic);
