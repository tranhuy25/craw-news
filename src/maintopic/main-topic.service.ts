
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MainTopic } from './main-topic.schema';
import fetch from 'node-fetch-commonjs';
import * as cheerio from 'cheerio';

@Injectable()
export class MainTopicService {
    constructor(@InjectModel('MainTopic')  private readonly mainTopicModel: Model<MainTopic>) { }

    async crawlAndSaveMainTopics() {
        const url = 'http://vnexpress.net'; 

        try {
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);

            const mainTopics = [];
// git init---- git add . ----- git commit -m "basic"  ---- git commit -m "basic"-----git push -uf origin demo
            $('parent').each((_index, element) => {
                const name = $(element).text();
                const link = $(element).attr('href');

                mainTopics.push({ name, link });
            });

            await this.mainTopicModel.create(mainTopics);

            console.log('Đã crawl và lưu chủ đề lớn thành công!');
        } catch (error) {
            console.error('Lỗi: ', error);
        }
    }
}
