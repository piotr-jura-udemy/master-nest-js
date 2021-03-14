import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { Connection } from "typeorm";
import { AppModule } from "./../src/app.module";
import { User } from "./../src/auth/user.entity";
import { loadFixtures as loadFixturesBase, tokenForUser as tokenForUserBase } from "./utils";

let app: INestApplication;
let mod: TestingModule;
let connection: Connection;

const loadFixtures = async (sqlFileName: string) =>
  loadFixturesBase(connection, sqlFileName);

const tokenForUser = (
  user: Partial<User> = {
    id: 1,
    username: 'e2e-test',
  }
): string => tokenForUserBase(app, user);

describe('Auth (e2e)', () => {
  beforeEach(async () => {
    mod = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = mod.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    connection = app.get(Connection);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return a valid token', async () => {
    await loadFixtures('1-user.sql');

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'e2e-test',
        password: 'password'
      })
      .expect(201)
      .then(response => {
        expect(response.body.userId).toBe(1);
        expect(response.body.token).toBeDefined();
        expect(response.body.token.length).toBeDefined();
        expect(response.body.token.length).toBeGreaterThanOrEqual(100);

        // Check if token is valid for use
        request(app.getHttpServer())
          .get('/auth/profile')
          .set('Authorization', `Bearer ${response.body.token}`)
          .expect(200);
      });
  });

  it('should throw an error with invalid credentials', async () => {
    await loadFixtures('1-user.sql');

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'e2e-test',
        password: 'pazzword'
      })
      .expect(401);
  });

  it('should return user profile', async () => {
    await loadFixtures('1-user.sql');

    return request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${tokenForUser()}`)
      .expect(200).then(response => {
        expect(response.body.id).toBe(1);
        expect(response.body.username).toBeDefined();
        expect(response.body.firstName).toBeDefined();
        expect(response.body.lastName).toBeDefined();
        expect(response.body.email).toBeDefined();
      });
  });

  it('should throw an error when unauthenticated user requests profile', () => {
    return request(app.getHttpServer())
      .get('/auth/profile')
      .expect(401);
  });

  it('should not return user\'s password with the profile', async () => {
    await loadFixtures('1-user.sql');

    return request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${tokenForUser()}`)
      .expect(200).then(response => {
        expect(response.body.password).toBeUndefined()
      });
  });
});