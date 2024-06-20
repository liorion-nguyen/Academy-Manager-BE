import { EntityRepository, Repository } from 'typeorm';
import { Confirm } from '../entities/confirm.etities';

@EntityRepository(Confirm)
export class ConfirmRepository extends Repository<Confirm> {
}