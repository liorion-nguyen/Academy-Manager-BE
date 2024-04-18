import { EntityRepository, Repository } from 'typeorm';
import { BoxChat } from '../entities/boxChat.entities';

@EntityRepository(BoxChat)
export class BoxChatRepository extends Repository<BoxChat> { }
