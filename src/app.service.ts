import { Injectable } from '@nestjs/common';

import mysql from 'mysql2/promise';
import { Jatek, Macska } from './models.js';
const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'allatok',
});


export async function getMacskak() {
  // Minden DB művelet aszinkron
  const [results] = await mysqlConnection.execute(
    'SELECT * FROM macskak',
  );
  // A select végeredménye objektumokból álló lista. Típusosan kapjuk vissza.
  const rows = results as Macska[];
  return rows;
}

export async function getJatekok() {
  // Minden DB művelet aszinkron
  const [results] = await mysqlConnection.execute(
    'SELECT * FROM jatekok',
  );
  // A select végeredménye objektumokból álló lista. Típusosan kapjuk vissza.
  const rows = results as Jatek[];
  return rows;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
