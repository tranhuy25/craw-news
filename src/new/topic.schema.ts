import * as mongoose from 'mongoose';

export const TopicSchema = new mongoose.Schema({
  name: String,
});

export interface TopicDocument extends mongoose.Document {
  name: string;
}

export const Topic = mongoose.model<TopicDocument>('Topic', TopicSchema);
