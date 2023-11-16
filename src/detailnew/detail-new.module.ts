
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DetailNewsController } from './detail-new.controller'
import { DetailNewsService } from './detail-new.service';
import { DetailNewSchema } from './detail-new.schema';
import { DB_DETAILNEW } from './constants';
import { NewsModule } from 'src/news/news.module';
import { CronJobService } from './cron.job.service';

@Module({
  imports: [MongooseModule.forFeature([{ name:DB_DETAILNEW, schema: DetailNewSchema }]),NewsModule],
  controllers: [DetailNewsController],
  providers: [DetailNewsService,CronJobService],
})
export class DetailNewsModule {}
