import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Newsmodule } from './new/news.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/node'),Newsmodule,ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]

})
export class AppModule {}

