import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './news.schema';
import fetch from 'node-fetch-commonjs';
import * as cheerio from 'cheerio';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class NewsService {
    crawlNews() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) { }

    async crawlAndSaveNews() {
        const url = 'https://vnexpress.net/so-hoa/cong-nghe';

        try {
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);

            const newsList = [];
            $('selector').each((_index, element) => {
                const title = $(element).find('selector').text();
                const link = $(element).find('selector').attr('href');
                const content = $(element).find('selector').text();
            
                newsList.push({
                    title,
                    link,
                    content,
                });
            });

            await this.newsModel.create(newsList);


            console.log('Đã crawl và lưu tin tức thành công!');
        } catch (error) {
            console.error('Lỗi: ', error);
        }
    }
    @Cron('45 * * * * *')
    handleCron() {
        console.log('Called when the current second is 45');
    }
}
