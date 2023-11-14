// import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { DetailNewsService } from './detail-new.service';

// @Injectable()
// export class CronJobService {
//   constructor(private detailService: DetailNewsService) {}

//   @Cron(CronExpression.EVERY_10_SECONDS)
//   handleCron() {
//     const currentTime = new Date().toLocaleTimeString();
//     console.log(`Cron Job is running at ${currentTime}`);
//        return this.detailService.crawlAndSaveDetailNews();
//   }
// }
