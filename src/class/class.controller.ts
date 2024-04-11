import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClassService } from "./class.service";
import { Class } from "./entities/class.entities";

@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService) { }

    @Get('/people/:people')
    async findAllPeople(@Param('people') people: string): Promise<any[]> {
        return this.classService.findAllPeople(people);
    }

    @Get()
    async findAll(): Promise<Class[]> {
        return this.classService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Class | undefined> {
        return this.classService.findOne(id);
    }

    @Post()
    async create(@Body() item: Class) {
        try {
            if (item.id) {
                throw new BadRequestException('No user ID is required!');
            }
            return this.classService.create(item);
        } catch (error) {
            console.error('Validation Error:', error);

            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Invalid user data', error.message);
        }
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() item: Partial<Class>): Promise<Class | undefined> {
        return this.classService.update(id, item);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.classService.remove(id);
    }
}