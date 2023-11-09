
import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get('crawl-and-save')
    async crawlAndSaveNews() {
        await this.newsService.crawlAndSaveNews();
        return { message: 'Crawl và lưu tin tức thành công!' };
    }
}
