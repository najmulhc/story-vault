import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // this is a comment that we are using for the people fo

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
