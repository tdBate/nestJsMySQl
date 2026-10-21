import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService, createJatek, deleteJatek, getJatekok, getMacskak, modositJatek } from './app.service.js';

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

  @Get("deleteJatek")
  @Render("jatekok")
  async getDeleteJatek(@Query("id") id: number) {
    await deleteJatek(id)
    return {
      data: await getJatekok()
    }
  }

  @Get("modositKezd")
  @Render("jatekok")
  async getJatekModositKezd(@Query("id") id: number) {
    const jatekok = await getJatekok()
    return {
      selectedElement: jatekok.find(item => item.id == id),
      data: jatekok
    }
  }

  @Post("modositVeg")
  @Render("jatekok")
  async getJatekModositVeg(@Body() body: { id: string, name: string }) {

    await modositJatek(body)
    const jatekok = await getJatekok()
    return {
      data: jatekok
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

  @Get("ujJatek")
  @Render("ujJatek")
  async getUjJatek() {
    return { message: "" }
  }

  @Post("ujJatek")
  @Render("ujJatek")
  async postUjJatek(@Body() body: { name: string }) {

    if (!body.name) { return { message: "nevet meg kell adni" } }

    await createJatek(body.name)

    return {
      message: "success"
    }
  }
}
