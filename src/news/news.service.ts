import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as cheerio from 'cheerio';
import { Model } from 'mongoose';
import fetch from 'node-fetch-commonjs';
import { News } from './news.schema';
import { Topic } from 'src/topic/topic.schema';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel('News')  private readonly newsModel: Model<News>,
        @InjectModel('Topic') private readonly topicModel: Model<Topic>,
    ) { }

    async crawlAndSaveNews() {
        const topics = await this.topicModel.find().exec();

        for (const topic of topics) {
            const url = topic.link;

            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const newsList = [];

                $('item-news thumb-left item-news-common').each((_index, element) => {
                    const title = $(element).find('title-news').text();
                    const createdAt = new Date(); 

                    newsList.push({
                        title,
                        createdAt,
                        topic: topic._id, // Liên kết tin tức với chủ đề con
                    });
                });

                await this.newsModel.create(newsList);

                console.log(`Đã crawl và lưu tin tức của chủ đề ${topic.name} thành công!`);
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    }
}
