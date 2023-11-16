// detail-news.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { detailNews } from './detail-new.schema';
import { DB_DETAILNEW } from './constants';
import { NewsService } from 'src/news/news.service';

@Injectable()
export class DetailNewsService {
    constructor(
        @InjectModel(DB_DETAILNEW) private readonly detailNewsModel: Model<detailNews>,
        private readonly newService: NewsService
    ) { }

    async crawlAndSaveDetailNews() {
        try {
            const newsList = await this.newService.find()

            for (const news of newsList) {
                const url = news.link;

                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const detailnew = [];

                $('.container').each((_index, element) => {

                    const title = $(element).find('.title-detail').text().replace(/\n\n+/g, '').trim();
                    const content = $(element).find('.description').text().replace(/\n\n+/g, '').trim();
                    const description = $(element).find('.fck_detail p Normal').text().replace(/\n\n+/g, '').trim();
                    const createdAt = new Date();            
    
                    detailnew.push({ title, content, description,createdAt });
    
                });

                await this.detailNewsModel.insertMany(detailnew)

                console.log(`Đã crawl và lưu chi tiết tin tức của thành công!`);
            }
        } catch (error) {
            console.error('Lỗi: ', error);
        }
    }
}
