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
            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const topic = [];

                $('.ul-nav-folder li a').each((_index, element) => {

                    const name = $(element).text().replace(/\n\n+/g, '').trim();
                    let link = $(element).attr('href').replace(/,/, '');
                    if(link.startsWith('https://vnexpress.net')){
                        console.log(">>>>Check>>>",link)
                    }else{
                        link='https://vnexpress.net'+link;
                    }
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
        return await this.topicModel.find().exec();
    }
}

