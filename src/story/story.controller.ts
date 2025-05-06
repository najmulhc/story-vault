import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RoleGuard } from 'src/user/guards/role.guard';
import { StroyDto } from './dto/story.dto';
import { StoryService } from './story.service';

@Controller('story')
export class StoryController {
  constructor(private service: StoryService) {}

  // get all the story info
  @Get()
  async getAllStories() {
    return await this.service.getAll();
  }

  // get all detailed stories
  @UseGuards(AuthGuard)
  @Get('/all-detailed')
  async getAllDetailedStories() {}

  // get a single story
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getStory(@Param('id') id: number) {}

  // add a new story
  @UseGuards(AuthGuard, new RoleGuard('admin'))
  @Post()
  async addNewStory(@Body() body: StroyDto) {}

  // update an existing story
  @UseGuards(AuthGuard, new RoleGuard('admin'))
  @Patch('/:id')
  async updateStory(@Param('id') id: number, @Body() body: StroyDto) {}

  // delete a story
  @UseGuards(AuthGuard, new RoleGuard('admin'))
  @Delete('/:id')
  async deleteStory(@Param('id') id: number) {}
}
