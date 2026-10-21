import { Controller, Get, Render } from '@nestjs/common';
import { AppService, getMacskak } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get("macskak")
  @Render("macskak")
  async macskak() {
    return {
      data: await getMacskak()
    }
  }
}
