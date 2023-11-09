// main-topic.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MainTopicService } from './main-topic.service';

@Controller('main-topics')
export class MainTopicController {
    constructor(private readonly mainTopicService: MainTopicService) { }

    @Get('crawl-and-save')
    async crawlAndSaveMainTopics() {
        await this.mainTopicService.crawlAndSaveMainTopics();
        return 'Crawl và lưu chủ đề lớn thành công!';
    }
}
