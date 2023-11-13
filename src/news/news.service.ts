import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as cheerio from 'cheerio';
import { Model } from 'mongoose';
import fetch from 'node-fetch-commonjs';
import { news } from './news.schema';
import { DB_NEW } from './constants';
import { TopicService } from 'src/topic/topic.service';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(DB_NEW) private readonly newsModel: Model<news>,
        private readonly topicService: TopicService
    ) { }

    async crawlAndSaveNews() {
        const topics = await this.topicService.find();

        for (const topic of topics) {
            const url = topic.link;

            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const newsList = [];

                $('.thumb-art a').each((_index, element) => {
                    const title = $(element).text();
                    const link = `https://vnexpress.net` + $(element).attr('href');
                    const createdAt = new Date();

                    console.log("???3", title)
                    newsList.push({
                        title,
                        link,
                        createdAt,
                        topic: topic._id, // Liên kết tin tức với chủ đề con
                    });
                });

                const dto = await this.newsModel.insertMany(newsList);
                console.log(dto)

                console.log(`Đã crawl và lưu tin tức của chủ đề ${topic.name} thành công!`);
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    }
    async find (){
        return this.newsModel.find().exec()
    }
}
