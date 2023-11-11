import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import fetch from 'node-fetch-commonjs';
import * as cheerio from 'cheerio';
import {topics } from './topic.schema';
import { MainTopicService } from 'src/maintopic/main-topic.service';

@Injectable()
export class TopicService {
    constructor(
        @InjectModel('Topic')  private readonly topicModel: Model<topics>,
        private readonly topicservice:MainTopicService
    ) { }

    async crawlAndSaveTopics() {
        const mainTopics = await this.topicservice.find();

        for (const mainTopic of mainTopics) {
            const url = mainTopic.link;

            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const topics = [];

                $('sub li a').each((_index, element) => {
                    const name = $(element).text();
                    const link = $(element).attr('href');

                    console.log("???2", name,link)

                    topics.push({ name, link, mainTopic: mainTopic._id });
                });
                 
                const dto=await this.topicModel.create(topics);

                console.log(dto)

                console.log(`Đã crawl và lưu chủ đề con của ${mainTopic.name} thành công!`);
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    }
    async find (){
        return this.topicModel.find().exec()
    }
}
