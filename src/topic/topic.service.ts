import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MainTopic } from 'src/maintopic/main-topic.schema';
import fetch from 'node-fetch-commonjs';
import * as cheerio from 'cheerio';
import { Topic } from './topic.schema';

@Injectable()
export class TopicService {
    constructor(
        @InjectModel('Topic')  private readonly topicModel: Model<Topic>,
        @InjectModel('MainTopic')  private readonly mainTopicModel: Model<MainTopic>,
    ) { }

    async crawlAndSaveTopics() {
        const mainTopics = await this.mainTopicModel.find().exec();

        for (const mainTopic of mainTopics) {
            const url = mainTopic.link;

            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const topics = [];

                $('sub').each((_index, element) => {
                    const name = $(element).text();
                    const link = $(element).attr('href');

                    topics.push({ name, link, mainTopic: mainTopic._id });
                });

                await this.topicModel.create(topics);

                console.log(`Đã crawl và lưu chủ đề con của ${mainTopic.name} thành công!`);
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    }
}
