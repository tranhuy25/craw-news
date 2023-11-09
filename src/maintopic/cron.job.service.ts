import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MainTopicService } from './main-topic.service';


@Injectable()
export class CronJobService {
  constructor(private maintopicService: MainTopicService) {}

  @Cron('0 * * * * *')
  handleCron() {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`Cron Job is running at ${currentTime}`);
       return this.maintopicService.crawlAndSaveMainTopics();
  }
}
