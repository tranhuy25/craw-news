import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NewsService } from './news.service'; // Import NewsService

@Injectable()
export class CronJobService {
  constructor(private newsService: NewsService) {}

  @Cron('0 * * * * *')
  handleCron() {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`Cron Job is running at ${currentTime}`);
       return this.newsService.crawlAndSaveNews();
  }
}
