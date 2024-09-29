import { Client } from 'src/Clients/Client.entity';
import { 
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('photos')

export class Photo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    fullname: string;
    @Column()
    phone: string;
    @Column()
    camera: string;
    @ManyToMany((type) => Client, (client) => client.photos)
  @JoinTable({
    name: 'client_photo',
    joinColumn: { name: 'photo_id' },
    inverseJoinColumn: { name: 'client_id' },
  })
  clients: Client[];
}