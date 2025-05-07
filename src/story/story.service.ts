import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StoryDto } from './dto/story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './story.entity';
import { Repository } from 'typeorm';
@Injectable()
export class StoryService {
  constructor(@InjectRepository(Story) private repo: Repository<Story>) { }

  // to get all the stories with no descriptions
  async getAll() {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  async getAllDetailed() {
    return [];
  }

  async getStory(id: number) {
    const story = await this.repo.findOneBy({ id });
    if (!story) {
      throw new NotFoundException('No story found with the given id.');
    }
    return story;
  }

  async addNew(payload: StoryDto) {
    const { title, author, description } = payload;
    try {
      const createdStory = await this.repo.create({
        title,
        author,
        description,
      });

      const savedStory = await this.repo.save(createdStory);
      return savedStory;
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async update(id: number, payload: StoryDto) {
    let story = await this.getStory(id);
    story = {
      ...story,
      ...payload,
    };
    return await this.repo.save(story);
  }

  async delete(id: number) {
    const story = await this.getStory(id);

    try {
      await this.repo.delete({
        id: story?.id,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'we were unable to perform this task',
      );
    }
  }
}
