import { Module } from '@nestjs/common';
import { ClientsModule } from './Clients/Clients.module';
import { DatasourceModule } from './datasource/datasource.module';
import { AdmModule } from './PhotostudioAdministrators/Admin.module';
import { PhotosModule } from './Photographs/Clients/Photo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [ClientsModule, DatasourceModule, AdmModule, PhotosModule, TypeOrmModule.forRoot({
    type: 'postgres', //тип подключаемой БД
    port: 5432,
    username: 'postgres', //имя пользователя
      password: 'password', //пароль
      host: 'localhost', //хост, в нашем случае БД развернута локально
      synchronize: false, //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
      logging: 'all', //включим логирование для удобства отслеживания процессов
	  entities: ['dist/**/*.entity{.ts,.js}'] }) ],
  controllers: [],
  providers: [],
})
export class AppModule {}
