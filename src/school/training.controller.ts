import { Controller, Post } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Controller('school')
export class TrainingController {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) { }

  @Post('/create')
  public async savingRelation() {
    const subject = new Subject();
    subject.name = 'Math';

    const teacher1 = new Teacher();
    teacher1.name = 'John Doe';

    const teacher2 = new Teacher();
    teacher2.name = 'Harry Doe';

    subject.teachers = [teacher1, teacher2];

    await this.subjectRepository.save(subject);
  }

  @Post('/remove')
  public async removingRelation() {
    const subject = await this.subjectRepository.findOne(
      1,
      { relations: ['teachers'] }
    );

    subject.teachers = subject.teachers.filter(
      teacher => teacher.id !== 2
    );

    await this.subjectRepository.save(subject);
  }
}