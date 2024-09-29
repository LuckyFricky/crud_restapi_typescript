
import { Client } from 'src/Clients/Client.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
@Entity('adms')  
export class Adm {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true }) 
    fullname: string;
    @Column()
    phone: string;
    @Column()
    email: string;
    @ManyToMany((type) => Client, (client) => client.adms)
  @JoinTable({
    name: 'client_adm',
    joinColumn: { name: 'adm_id' },
    inverseJoinColumn: { name: 'client_id' },
  })
  clients: Client[];

}