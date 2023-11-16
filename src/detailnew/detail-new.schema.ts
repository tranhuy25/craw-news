import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_DETAILNEW } from './constants';

@Schema({ collection: DB_DETAILNEW })
export class detailNews {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    description: string;

    @Prop()
    createdAt: Date;

}

export const DetailNewSchema = SchemaFactory.createForClass(detailNews);
