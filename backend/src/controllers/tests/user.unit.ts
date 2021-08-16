import { expect } from 'chai';
import request from 'supertest';

describe('User/auth controller', () => {
  let server: any;
  let userId: any;
  let authToken: string;

  before(async () => {
    server = require('../../app');
    const user = {
      username: "supervisor",
      password: "test123"
    };
    const { body } = await request(server).post('/auth/login').send(user);
    authToken = body.token;
  });

  after(() => {
    server.close();
  });

  it('should create a new user', async () => {
    const user = {
      username: 'testing12321',
      password: 'qwerty',
      firstname: "user",
      lastname: "unit-test",
      email: "user.unit-test@example.com",
      staffid: "701",
      isSupervisor: true
    };
    const { body, status } = await request(server).post('/auth/register').send(user);
    userId = body._id;
    expect(status).to.equal(200);
  });

  it('should say user already exists', async () => {
    const user = {
      username: 'testing12321',
      password: 'qwerty',
    };
    const { body } = await request(server).post('/auth/register').send(user);
    expect(body.msg).to.equal('Duplicate key');
  });

  it('should get all users', async () => {
    const { body } = await request(server).get('/user/all').set('Authorization', 'Bearer ' + authToken).send();
    expect(body.length).to.equal(2);
  });

  it('should login a user', async () => {
    const user = {
      username: 'testing12321',
      password: 'qwerty',
    };
    const { body } = await request(server).post('/auth/login').send(user);
    expect(body.user._id).to.equal(userId);
  });

  it("should check auth of a user (no success)", async function () {
    const { body, status } = await request(server).get("/auth").send("jiberish");
    expect(status).to.equal(401);
  })

  it("should check auth of a user (success)", async function () {
    const { body, status } = await request(server).get("/auth").set('Authorization', 'Bearer ' + authToken).send();
    expect(status).to.equal(200);
  })

  it('should NOT login a user (wrong username)', async () => {
    const user = {
      username: 'testing1232111',
      password: 'qwerty',
    };
    const { body } = await request(server).post('/auth/login').send(user);
    expect(body.err).to.equal('Username or password is incorrect');
  });

  it('should NOT login a user (wrong password)', async () => {
    const user = {
      username: 'testing12321',
      password: 'qwerty1',
    };
    const { body } = await request(server).post('/auth/login').send(user);
    expect(body.err).to.equal('Username or password is incorrect');
  });
});
