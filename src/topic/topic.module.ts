
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TopicSchema } from './topic.schema';
import { MainTopicSchema } from 'src/maintopic/main-topic.schema';
import { CronJobService } from './cron.job.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Topic', schema: TopicSchema },{ name: 'MainTopic', schema: MainTopicSchema }]),],
    controllers: [TopicController],
    providers: [TopicService,CronJobService],
})
export class Topicmodule {}
