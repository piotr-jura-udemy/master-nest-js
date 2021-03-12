import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as fs from "fs";
import * as path from "path";
import * as request from "supertest";
import { Connection } from "typeorm";
import { AppModule } from "./../src/app.module";

let app: INestApplication;
let mod: TestingModule;
let connection: Connection;

const loadFixtures = async (sqlFileName: string) => {
  const sql = fs.readFileSync(
    path.join(__dirname, 'fixtures', sqlFileName),
    'utf8'
  );

  const queryRunner = connection.driver.createQueryRunner('master');

  for (const c of sql.split(';')) {
    await queryRunner.query(c);
  }
}

describe('Events (e2e)', () => {
  beforeAll(async () => {
    mod = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = mod.createNestApplication();
    await app.init();

    connection = app.get(Connection);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return an empty list of events', async () => {
    return request(app.getHttpServer())
      .get('/events')
      .expect(200)
      .then(response => {
        expect(response.body.data.length).toBe(0);
      });
  });

  it('should return a single event', async () => {
    await loadFixtures('1-event-1-user.sql');

    return request(app.getHttpServer())
      .get('/events/1')
      .expect(200)
      .then(response => {
        expect(response.body.id).toBe(1);
        expect(response.body.name).toBe('Interesting Party');
      })
  });
});