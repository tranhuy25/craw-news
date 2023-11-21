import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Maintopicmodule } from './maintopic/main-topic.module';
import { Topicmodule } from './topic/topic.module';
import { NewsModule } from './news/news.module'

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://tvh25082004:tranvanhuy@cluster0.xxkkrig.mongodb.net/tintuc'),
    Maintopicmodule, Topicmodule,NewsModule,ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]

})
export class AppModule { }




