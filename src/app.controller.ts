import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService, getJatekok, getMacskak } from './app.service.js';

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

  @Get("jatekok")
  @Render("jatekok")
  async jatekok() {
    return {
      data: await getJatekok()
    }
  }

  @Get("macskaKeres")
  @Render("filterMacskak")
  async filterMacskak(@Query("szemszin") szemszin: string) {
    if (!szemszin) return { data: await getMacskak() }

    return {
      data: (await getMacskak()).filter(a => a.szem_szin.includes(szemszin))
    }
  }
}
