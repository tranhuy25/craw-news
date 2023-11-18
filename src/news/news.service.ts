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
        const topicdto = await this.topicService.find();

        for await (const topic of topicdto) {
            const url = topic.link;

            console.log("----------", url, "-----------")

            try {
                const response = await fetch(url);
                const html = await response.text();
                const $ = cheerio.load(html);

                const newsList = [];

                $('.item-news .thumb-art').each((_index, element) => {
                    const link = $(element).find('a').attr('href').replace(/,/, '');
                    const createdAt = new Date();

                    console.log("???3",link)
                    newsList.push({
                        link,
                        createdAt,
                    });
                });
                   const dto =await this.newsModel.insertMany(newsList);

                   console.log(">>>>>check>>>>>",dto)

                   const newsLists = await this.newsModel.find().exec()

                   for (const news of newsLists) {
                       const url = news.link;

                       const response = await fetch(url);
                       const html = await response.text();
                       const $ = cheerio.load(html);
       
                       const detailnew = [];
       
                       $('.fck_detail .Normal').each((_index, element) => {
                           const content = $(element).text().replace(/\n\n+/g, '').trim();
                           const description = $(element).text().replace(/\n\n+/g, '').trim();
                           detailnew.push({ content, description});          
                       });
       
                       const dto = await this.newsModel.insertMany(detailnew)
                       console.log(dto)
                   }

            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    }
}
