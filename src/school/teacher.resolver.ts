import { Resolver, Query } from '@nestjs/graphql';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  @Query(() => [Teacher])
  public async teachers(): Promise<Teacher[]> {
    return await this.teachersRepository.find({
      relations: ['subjects'],
    });
  }
}
