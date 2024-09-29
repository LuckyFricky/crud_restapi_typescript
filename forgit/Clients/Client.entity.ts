import { Adm } from 'src/PhotostudioAdministrators/Admin.entity';
import { Photo } from 'src/Photographs/Clients/Photo.entity';
import {
    Admin,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
@Entity('clients') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица

export class Client {
    @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
    id: number;
    @Column({}) //колонка таблицы, сюда можно добавить большое количество параметров для БД, например тип, уникальность, триггер и т.д.
    fullname: string;
    @Column()
    phone: string;
    @ManyToMany((type) => Photo, (photo) => photo.clients) //Создадим связь многие ко многим с сущностью photo и свяжем с полем clients в статье
    @JoinTable({
      //join таблица с названием author_article
      name: 'clients_photo',
      joinColumn: { name: 'client_id' }, //для связи с идентификатором автора
      inverseJoinColumn: { name: 'photo_id' }, //для связи с идентификатором статьи
    })
    clients: Client[]; //объект, в котором будем автоматически получать все статьи автора
  @ManyToMany((type) => Adm, (adm) => adm.clients) //тоже самое для аффилиаций
  @JoinTable({
    name: 'client_adm',
    joinColumn: { name: 'client_id' },
    inverseJoinColumn: { name: 'adm_id' },
  })
  adms: Adm[];
  @ManyToMany((type) => Photo, (photo) => photo.clients) //тоже самое для аффилиаций
  @JoinTable({
    name: 'client_adm',
    joinColumn: { name: 'client_id' },
    inverseJoinColumn: { name: 'adm_id' },
  })
  photos: Photo[];
  
    
}

