import { Photo } from "./Photo.entity";
import { PhotosService } from "./Photo.service";
import { Controller, Get, Put, Param, Body, Post, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiOperation } from "@nestjs/swagger";

@ApiTags('photo')
@Controller('photo')
export class PhotosController {
    constructor(private readonly photoService: PhotosService) { }

    @ApiOperation({ summary: 'Создание' })
    @Post()
    create(@Body() createPhoto: Photo) {
        return this.photoService.create(createPhoto);
    }

    @ApiOperation({ summary: 'Вывод' })
    @Get()
    findAll() {
        return this.photoService.findAll();
    }

    @ApiOperation({ summary: 'Поиск' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.photoService.findOne(+id);
    }

    @ApiOperation({ summary: 'Обновление' })
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePhoto: Photo) {
        return this.photoService.update(+id, updatePhoto);
    }

    @ApiOperation({ summary: 'Удаление' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.photoService.remove(+id);
    }


}



