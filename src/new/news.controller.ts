import { Controller, Get, Post } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
 @Get('crawl')
  async crawlNews() {
    const dto =await this.newsService.crawlAndSaveNews();
    console.log(dto)
    return 'Đã crawl và lưu tin tức thành công!';
  }
}
