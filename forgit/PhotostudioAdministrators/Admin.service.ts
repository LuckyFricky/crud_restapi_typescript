
import { HttpStatus, Injectable } from "@nestjs/common";
import { DatasourceService } from 'src/datasource/datasource.service';
import { Client } from "src/Clients/Client.entity";
import { Module } from "@nestjs/common";

import { Photo } from 'src/Photographs/Clients/Photo.entity';
import { Adm } from 'src/PhotostudioAdministrators/Admin.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdmDto } from "./dto/AdmDTO";


export class AdmService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Author в сервис
        @InjectRepository(Adm)
        private readonly admRepository: Repository<Adm>, // "внедряем" репозиторий Affiliation в сервис
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>, // "внедряем" репозиторий Artilcle в сервис
      ) {}
    
      async create(admDto: CreateAdmDto): Promise<Adm>
    {
      //получаем объект CreateAuthorDto
      const adm = this.admRepository.create(); //создаем объект Author из репозитория
      adm.fullname = admDto.fullname; //заполняем поля объекта Author
      adm.phone = admDto.phone;
      adm.email= admDto.email;
      
      await this.clientRepository.save(adm); //сохраняем объект Author в БД
      return adm; //возвращаем объект Author
    }
    
        
      
        async findAll(): Promise<Adm[]> {
          const adms = await this.admRepository.find({
            //получаем связанные объекты
            relations: {
              clients: true
            },
          }); //получаем массив Author из БД
          return adms; //возвращаем массив Author
        }
      
        async update(id: number, updatedAdm: Adm) {
          //получаем объект Photo для обновления по id
          const adm = await this.admRepository.findOne({ where: { id } }); //получаем объект Photo по id из БД
          adm.fullname = updatedAdm.fullname; //обновляем поля объекта Author
          adm.phone = updatedAdm.phone;
          adm.email = updatedAdm.email;
          adm.clients = updatedAdm.clients;
          await this.admRepository.save(adm); //сохраняем объект Author в БД
          return adm; //возвращаем объект Author
        }
      
        remove(id: number) {
          this.admRepository.delete({ id }); //удаляем объект Author из БД
        }

        findOne(id: number): Promise<Adm> {

            return this.admRepository.findOne({
              where: { id }, 
              relations: { clients: true},
            });
    
    
}

}