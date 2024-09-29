import { CreateClientDto } from './../../Clients/dto/ClientDTO';
import { DatasourceService } from "src/datasource/datasource.service";
import { Photo } from "./Photo.entity";
import { Module } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { HttpStatus } from '@nestjs/common';
import { IncompleteClientDto } from 'src/Clients/dto/Incomplete-client.dto';
import { Client } from 'src/Clients/Client.entity';
import { Adm } from 'src/PhotostudioAdministrators/Admin.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from '../dto/PhotoDTO';


export class PhotosService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Author в сервис
    @InjectRepository(Adm)
    private readonly admRepository: Repository<Adm>, // "внедряем" репозиторий Affiliation в сервис
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>, // "внедряем" репозиторий Artilcle в сервис
  ) {}

  async create(photoDto: CreatePhotoDto): Promise<Photo>
{
  //получаем объект CreateAuthorDto
  const photo = this.photoRepository.create(); //создаем объект Author из репозитория
  photo.fullname = photoDto.fullname; //заполняем поля объекта Author
  photo.phone = photoDto.phone;
  photo.camera = photoDto.camera;
  
  await this.clientRepository.save(photo); //сохраняем объект Author в БД
  return photo; //возвращаем объект Author
}

    
  
    async findAll(): Promise<Photo[]> {
      const photos = await this.photoRepository.find({
        //получаем связанные объекты
        relations: {
          clients: true
        },
      }); //получаем массив Author из БД
      return photos; //возвращаем массив Author
    }
  
    async update(id: number, updatedPhoto: Photo) {
      //получаем объект Photo для обновления по id
      const photo = await this.photoRepository.findOne({ where: { id } }); //получаем объект Photo по id из БД
      photo.fullname = updatedPhoto.fullname; //обновляем поля объекта Author
      photo.phone = updatedPhoto.phone;
      photo.camera = updatedPhoto.camera;
      photo.clients = updatedPhoto.clients;
      await this.photoRepository.save(photo); //сохраняем объект Author в БД
      return photo; //возвращаем объект Author
    }
  
    remove(id: number) {
      this.photoRepository.delete({ id }); //удаляем объект Author из БД
    }

    findOne(id: number): Promise<Photo> {

      return this.photoRepository.findOne({
        where: { id }, 
        relations: { clients: true}
      });
  
   
    
    
    
    
    
}

}
