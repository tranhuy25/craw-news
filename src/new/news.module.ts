import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './news.schema';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CronJobService } from './cron.job.service';
import { Topic, TopicSchema } from './topic.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }])],
  controllers: [NewsController],
  providers: [NewsService,CronJobService],
})
export class Newsmodule {}
