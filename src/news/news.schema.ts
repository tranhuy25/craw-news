
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class News {
  @Prop()
  title: string;

  @Prop()
  createdAt: Date;

}

export const NewsSchema = SchemaFactory.createForClass(News);
