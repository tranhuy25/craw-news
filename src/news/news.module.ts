
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicSchema } from 'src/topic/topic.schema';
import { CronJobService } from './cron.job.service';
import { NewsController } from './news.controller';
import { NewsSchema } from './news.schema';
import { NewsService } from './news.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'News', schema: NewsSchema },{ name: 'Topic', schema: TopicSchema } ]),],
    controllers: [NewsController],
    providers: [NewsService,CronJobService,],
})
export class NewsModule {}
