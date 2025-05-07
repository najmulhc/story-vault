import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RoleGuard } from 'src/user/guards/role.guard';
import { StoryDto } from './dto/story.dto';
import { StoryService } from './story.service';
import { UpdateStoryDto } from './dto/updateStory.dto';
import { SerializeInterceptor } from './interceptors/story.interceptor';
import { StoryResponseDto } from './dto/storyResponse.dto';

@Controller('story')
export class StoryController {
  constructor(private service: StoryService) {}

  // get all the story info

  @Get()
  @UseInterceptors(new SerializeInterceptor(StoryResponseDto))
  async getAllStories() {
    const stories = await this.service.getAll();
    return stories;
  }

  // get all detailed stories
  @UseGuards(AuthGuard)
  @Get('/all-detailed')
  async getAllDetailedStories() {
    return await this.service.getAll();
  }

  // get a single story
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getStory(@Param('id') id: number) {
    return await this.service.getStory(id);
  }

  // add a new story
  @UseGuards(AuthGuard, new RoleGuard('admin'))
  @Post()
  async addNewStory(@Body() body: StoryDto) {
    return await this.service.addNew(body);
  }

  // update an existing story
  @UseGuards(AuthGuard, new RoleGuard('admin'))
  @Patch('/:id')
  async updateStory(@Param('id') id: number, @Body() body: UpdateStoryDto) {
    return await this.service.update(id, body);
  }

  // delete a story
  @UseGuards(AuthGuard, new RoleGuard('admin'))
  @Delete('/:id')
  async deleteStory(@Param('id') id: number) {
    await this.service.delete(id);
  }
}
