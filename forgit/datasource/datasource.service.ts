import { Injectable } from '@nestjs/common';
import { Client } from 'src/Clients/Client.entity';
import { Adm } from 'src/PhotostudioAdministrators/Admin.entity';
import { Photo } from 'src/Photographs/Clients/Photo.entity';

@Injectable()
export class DatasourceService {
  private clients: Client[] = [];

  private Adms: Adm[] = [];

  private photos : Photo[] = [];

  getClients(): Client[] {
    return this.clients;
  }

  getAdm(): Adm[] {
    return this.Adms;
}
  getPhotos(): Photo[]{
    return this.photos;
  }
  
}
