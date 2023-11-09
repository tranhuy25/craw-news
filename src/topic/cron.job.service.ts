import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TopicService } from './topic.service';

@Injectable()
export class CronJobService {
  constructor(private topicService: TopicService) {}

  @Cron('0 * * * * *')
  handleCron() {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`Cron Job is running at ${currentTime}`);
       return this.topicService.crawlAndSaveTopics();
  }
}
