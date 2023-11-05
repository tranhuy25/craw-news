import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './news.schema';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: " News", schema: NewsSchema }])],
  controllers: [NewsController],
  providers: [NewsService],
  exports:[NewsService,MongooseModule]
})
export class Newsmodule {}
