// // detail-news.service.ts
// import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import fetch from 'node-fetch';
// import * as cheerio from 'cheerio';
// import { detailNews } from './detail-new.schema';
// import { DB_DETAILNEW } from './constants';
// import { NewsService } from 'src/news/news.service';

// @Injectable()
// export class DetailNewsService {
//     constructor(
//         @InjectModel(DB_DETAILNEW) private detailNewsModel: Model<detailNews>,
//         private readonly detailnewService: NewsService
//     ) { }

//     async crawlAndSaveDetailNews() {
//         try {
//             const newsList = await this.detailnewService.find()

//             for (const news of newsList) {
//                 const url = news.link;

//                 const response = await fetch(url);
//                 const html = await response.text();
//                 const $ = cheerio.load(html);

//                 const title = $('TITLE_SELECTOR').text();
//                 const author = $('AUTHOR_SELECTOR').text();
//                 const content = $('CONTENT_SELECTOR').text();
//                 const createdAt = new Date();

//                 await this.detailNewsModel.create({ title, author, content, createdAt });

//                 console.log(`Đã crawl và lưu chi tiết tin tức của ${news.title} thành công!`);
//             }
//         } catch (error) {
//             console.error('Lỗi: ', error);
//         }
//     }
// }
