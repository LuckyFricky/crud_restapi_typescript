import { Module } from '@nestjs/common';
import {Client} from './Client.entity'
import { ClientsController } from './Clients.controller';
import { ClientsService } from './clients.service';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Photo } from 'src/Photographs/Clients/Photo.entity';
import { Adm } from 'src/PhotostudioAdministrators/Admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [DatasourceModule, TypeOrmModule.forFeature([Client, Adm, Photo]), ],// !!! В модуле автор мы используем все три сущности, поэтому все три сущности необходимо импортирвоать!]
})
export class ClientsModule {}

