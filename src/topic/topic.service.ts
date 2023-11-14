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
        private readonly topicservice: MainTopicService
    ) { }

    async crawlAndSaveTopics() {
        const mainTopicdto = await this.topicservice.find();
        
        for (const mainTopic of mainTopicdto) {

            const url = 'https://vnexpress.net'+mainTopic.link;

            console.log("----------------", url)
            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const topic = [];

                $('.sub li ').each((_index, element) => {

                    const name = $(element).find('a').text().replace(/\n\n+/g, '').trim();

                    const link = url+$(element).find('a').attr('href').replace(/,/, '');

                    console.log("???2", name, link)

                    console.log(`----Đã crawl chủ đề con của ${mainTopic.name}------`);

                    topic.push({ name, link, mainTopic: mainTopic._id });
                });

                const dto = await this.topicModel.insertMany(topic);

                console.log(dto)

              
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    }
    async find() {
        return await this.topicModel.find().exec()
    }
}

