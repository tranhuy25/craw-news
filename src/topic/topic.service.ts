import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import fetch from 'node-fetch-commonjs';
import * as cheerio from 'cheerio';
import { topics } from './topic.schema';
import { MainTopicService } from 'src/maintopic/main-topic.service';
import { DB_TOPIC } from './constants';

@Injectable()
export class TopicService {
    constructor(
        @InjectModel(DB_TOPIC) private readonly topicModel: Model<topics>,
        private readonly maintopicservice: MainTopicService
    ) { }

    async crawlAndSaveTopics() {
        const mainTopicdto = await this.maintopicservice.find();

        for await (const mainTopic of mainTopicdto) {

            const url = mainTopic.link;

            console.log("----------", url, "-----------")
            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const topic = [];

                $('.sub li a').each((_index, element) => {

                    const name = $(element).text().replace(/\n\n+/g, '').trim();
                    const link = $(element).attr('href').replace(/,/, '');

                    console.log("???2", name, link)

                    console.log(`Đã crawl chủ đề con của ${mainTopic.name} thành công`);

                    topic.push({ name, link, mainTopic: mainTopic._id });
                });

                await this.topicModel.insertMany(topic)

            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    }
    async find() {
        return await this.topicModel.find().exec()
    }
}

