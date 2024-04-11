import { EntityRepository, Repository } from 'typeorm';
import { Class } from '../entities/class.entities';

@EntityRepository(Class)
export class ClassRepository extends Repository<Class> {
}