import { Client } from "./Client.entity";
import { ClientsService } from "./clients.service";
import { Controller, Get, Put, Param, Body, Post, Delete } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { CreateClientDto } from "./dto/ClientDTO";


@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @ApiOperation({ summary: 'Поиск' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientsService.findOne(+id);
    }

    @ApiOperation({ summary: 'Вывод' })
    @Get()
    findAll() {
        return this.clientsService.findAll();
    }
    
    @ApiOperation({ summary: 'Обновление' })
    @Put(':id')
    update(@Param('id') id: string, @Body() updateClient: Client) {
        return this.clientsService.update(+id, updateClient);
    }

    @ApiOperation({ summary: 'Создание' })
    @Post()
    create(@Body() createClient: CreateClientDto) {
        return this.clientsService.create(createClient);
    }

    @ApiOperation({ summary: 'Удаление' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.remove(+id);
    }


}




