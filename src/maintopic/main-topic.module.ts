import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainTopicSchema } from './main-topic.schema';
import { MainTopicService } from './main-topic.service';
import { MainTopicController } from './main-topic.controller';
import { CronJobService } from './cron.job.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'MainTopic', schema: MainTopicSchema }])],
    controllers: [MainTopicController],
    providers: [MainTopicService,CronJobService],
})
export class Maintopicmodule { }
