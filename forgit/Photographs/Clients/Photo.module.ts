import { Module } from '@nestjs/common';
import {Photo} from './Photo.entity'
import { PhotosController } from './Photo.controller';
import { PhotosService } from './Photo.service';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/Clients/Client.entity';
import { Adm } from 'src/PhotostudioAdministrators/Admin.entity';
@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [DatasourceModule,TypeOrmModule.forFeature([Client, Adm, Photo]), ],// !!! В модуле автор мы используем все три сущности, поэтому все три сущности необходимо импортирвоать!]

})
export class PhotosModule {}

