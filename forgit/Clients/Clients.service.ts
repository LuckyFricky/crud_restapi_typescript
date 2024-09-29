import { IncompleteClientDto } from './dto/Incomplete-client.dto';
import { DatasourceService } from './../datasource/datasource.service';
import { Client } from "./Client.entity";
import { Module } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { HttpStatus } from '@nestjs/common';
import { Photo } from 'src/Photographs/Clients/Photo.entity';
import { Adm } from 'src/PhotostudioAdministrators/Admin.entity';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/ClientDTO';

@Injectable()
export class ClientsService {

    constructor(
      @InjectRepository(Client)
      private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Author в сервис
    ) {}
  
    async create(clientDto: CreateClientDto): Promise<Client>
 {
    //получаем объект CreateAuthorDto
    const client = this.clientRepository.create(); //создаем объект Author из репозитория
    client.fullname = clientDto.fullname; //заполняем поля объекта Author
    client.phone = clientDto.phone;
    
    await this.clientRepository.save(client); //сохраняем объект Author в БД
    return client; //возвращаем объект Author
  }

      
    
      async findAll(): Promise<Client[]> {
        const clients = await this.clientRepository.find({
          //получаем связанные объекты
          relations: {
            adms: true,
            photos: true,
          },
        }); //получаем массив Author из БД
        return clients; //возвращаем массив Author
      }
    
      async update(id: number, updatedClient: Client) {
        //получаем объект Author для обновления по id
        const client = await this.clientRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
        client.fullname = updatedClient.fullname; //обновляем поля объекта Author
        client.phone = updatedClient.phone;
        client.adms = updatedClient.adms;
        client.photos = updatedClient.photos;
        await this.clientRepository.save(client); //сохраняем объект Author в БД
        return client; //возвращаем объект Author
      }
    
      remove(id: number) {
        this.clientRepository.delete({ id }); //удаляем объект Author из БД
      }
    
      async findIncomplete(): Promise<IncompleteClientDto[]> {
        const clients = await this.clientRepository.find(); //получаем массив Author из БД
        const incompleteClients: IncompleteClientDto[] = clients.map((client) => {
          //преобразуем массив Author в массив IncompleteAuthorDto
          const incompleteClient = new IncompleteClientDto();
          incompleteClient.id = client.id;
          incompleteClient.fullName = client.fullname;
          return incompleteClient;
        });
        return incompleteClients; //возвращаем массив IncompleteAuthorDto
      }

      findOne(id: number): Promise<Client> {

        return this.clientRepository.findOne({
          where: { id }, 
          relations: { adms: true},
        });
    
     
    
    
    
    
}

}
