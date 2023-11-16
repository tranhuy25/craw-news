
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { mainTopics } from './main-topic.schema';
import fetch from 'node-fetch-commonjs';
import * as cheerio from 'cheerio';
import { DB_MAINTOPIC } from './constants';

@Injectable()
export class MainTopicService {
    constructor(@InjectModel(DB_MAINTOPIC) private readonly mainTopicModel: Model<mainTopics>) { }

    async crawlAndSaveMainTopics() {
        const url = 'https://vnexpress.net/';

        try {
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);

            const mainTopic = [];
            $('.parent li a').each((_index, element) => {
                const name = $(element).text().replace(/\n\n+/g, '').trim();
                const DtoLink = 'https://vnexpress.net';
                const link = DtoLink+$(element).attr('href').replace(/,/, '');

                console.log("???1",name,link)

                mainTopic.push({ name, link });
            });

            await this.mainTopicModel.insertMany(mainTopic);
            console.log('Đã crawl và lưu chủ đề lớn thành công!');
        } catch (error) {
            console.error('Lỗi: ', error);
        }
    }
    async find() {
        return await this.mainTopicModel.find().exec();
    }
}
