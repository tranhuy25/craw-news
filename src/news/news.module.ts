
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicSchema } from 'src/topic/topic.schema';
import { CronJobService } from './cron.job.service';
import { NewsController } from './news.controller';
import { NewsSchema } from './news.schema';
import { NewsService } from './news.service';
import { DB_NEW } from './constants';
import { DB_TOPIC } from 'src/topic/constants';
import { TopicService } from 'src/topic/topic.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: DB_NEW, schema: NewsSchema } ]),],
    controllers: [NewsController],
    providers: [NewsService,CronJobService,TopicService],
})
export class NewsModule {}
