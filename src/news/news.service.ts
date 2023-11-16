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

        for await (const topic of topics) {
            const url = topic.link;
            console.log(url)
            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const newsList = [];

                $('.item-news item-news-common thumb-left').each((_index, element) => {
                    const title = $(element).find('title-news').text().replace(/\n\n+/g, '').trim();
                    const link = $(element).find('thumb-art').attr('href').replace(/,/, '');
                    const description = $(element).find('description').text().replace(/\n\n+/g, '').trim();
                    const createdAt = new Date();

                    console.log("???3", title,link)
                    newsList.push({
                        title,
                        link,
                        description,
                        createdAt,
                        topic: topic._id, 
                    });
                });
                   await this.newsModel.insertMany(newsList);

                console.log(`Đã crawl và lưu tin tức của chủ đề ${topic.name} thành công!`);
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    }
    async find() {
        return await this.newsModel.find().exec();
    }
}
