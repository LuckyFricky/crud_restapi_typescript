import { Module } from "@nestjs/common";
import { Adm } from "./Admin.entity";
import { AdmController } from "./Admin.controller";
import { AdmService } from "./Admin.service";
import { DatasourceModule } from "src/datasource/datasource.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "src/Clients/Client.entity";
import { Photo } from "src/Photographs/Clients/Photo.entity";
@Module({
    controllers: [ AdmController],
    providers: [ AdmService],
    imports: [DatasourceModule, Adm, TypeOrmModule.forFeature([Client, Adm, Photo]), ],// !!! В модуле автор мы используем все три сущности, поэтому все три сущности необходимо импортирвоать!]
})
export class AdmModule {}