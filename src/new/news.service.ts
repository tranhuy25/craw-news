import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './news.schema';
import { Topic, TopicDocument } from './topic.schema';
import fetch from 'node-fetch-commonjs';
import * as cheerio from 'cheerio';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<NewsDocument>,
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>, // Inject TopicModel
  ) {}

  async crawlAndSaveNews() {
    const url = 'https://vnexpress.net/so-hoa/cong-nghe';

    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      const newsList = [];
      const topicsList = [];

      $('selector').each((_index, element) => {
        const title = $(element).find('selector').text();
        const link = $(element).find('selector').attr('href');
        const content = $(element).find('selector').text();
        const createdAt = new Date();

        newsList.push({
          title,
          link,
          content,
          createdAt,
        });
        console.log(newsList)
        const topicName = $(element).find('selector').text();

        topicsList.push({
          name: topicName,
        });
      });
      await this.newsModel.create(newsList);

      await this.topicModel.create(topicsList);

      console.log('Đã crawl và lưu tin tức và chủ đề tin tức thành công!');
      console.log(topicsList)

    } catch (error) {
      console.error('Lỗi: ', error);
    }
  }
}
