import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Maintopicmodule } from './maintopic/main-topic.module';
import { Topicmodule } from './topic/topic.module';
import { NewsModule } from './news/news.module'
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load :[config],
  }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tin_tuc'),
    Maintopicmodule, Topicmodule,NewsModule,ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]

})
export class AppModule { }




