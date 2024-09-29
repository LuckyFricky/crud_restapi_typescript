import { Adm } from "./Admin.entity";
import { AdmService } from "./Admin.service";
import { Controller, Get, Put, Param, Body, Post, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiOperation } from "@nestjs/swagger";
import { CreateAdmDto } from "./dto/AdmDTO";

@ApiTags('Administartor')
@Controller('administrator')
export class AdmController {
    constructor(private readonly AdmService: AdmService) { }


    @ApiOperation({ summary: 'Создание администратора' }) // Операция для Swagger
    @Post()
    create(@Body() createAdm: CreateAdmDto) {
        return this.AdmService.create(createAdm);
    }

    @ApiOperation({ summary: 'Вывод' })
    @Get()
    findAll() {
        return this.AdmService.findAll();
    }

    @ApiOperation({ summary: 'Поиск' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.AdmService.findOne(+id);
    }



    @ApiOperation({ summary: 'Обновление' })
    @Put(':id')
    update(@Param('id') id: string, @Body() updateAdm: Adm) {
        return this.AdmService.update(+id, updateAdm);
    }

    @ApiOperation({ summary: 'Удаление' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.AdmService.remove(+id);
    }


}



