import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import fetch from 'node-fetch-commonjs';
import * as cheerio from 'cheerio';
import {topics } from './topic.schema';
import { MainTopicService } from 'src/maintopic/main-topic.service';
import { DB_TOPIC } from './constants';

@Injectable()
export class TopicService {
    constructor(        
        @InjectModel(DB_TOPIC)  private readonly topicModel: Model<topics>,
        private readonly topicservice:MainTopicService
    ) { }

    async crawlAndSaveTopics() {
        const mainTopics = await this.topicservice.find();
        console.log(mainTopics)
        for (const mainTopic of mainTopics) {
            const baseLink = 'https://vnexpress.net';
            const url =baseLink+mainTopic.link;

            console.log("----------------",url)

            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const topic = [];

                $('.sub li a').each((_index, element) => {
                    const namedemo = $(element).text();
                    const name = namedemo.replace(/\n/g,'').trim();
                    
                    const link = url+$(element).attr('href');

                    console.log("???2", name,link)

                    topic.push({ name, link, mainTopic: mainTopic._id });
                });
                 
                const dto=await this.topicModel.insertMany(topic);

                console.log(dto)

                console.log(`Đã crawl và lưu chủ đề con của ${mainTopic.name}thành công!`);
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    }
    async find (){
        return this.topicModel.find().exec()
    }
}
