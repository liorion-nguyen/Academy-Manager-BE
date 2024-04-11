import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../entities/message.entities';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> { }
