import { expect } from 'chai';
import request from 'supertest';

describe('User/auth controller', () => {
  let server: any;
  let userId: any;

  beforeEach(() => {
    server = require('../../app');
  });

  afterEach(() => {
    server.close();
  });

  it('should create a new user', async () => {
    const user = {
      username: 'testing12321',
      password: 'qwerty',
    };
    const { body } = await request(server).post('/auth/register').send(user);
    userId = body._id;
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
    await request(server).post('/user');

    const { body } = await request(server).get('/user');
    expect(body.length).to.equal(1);
    expect(body[0]._id).to.equal(userId);
  });

  it('should login a user', async () => {
    const user = {
      username: 'testing12321',
      password: 'qwerty',
    };
    const { body } = await request(server).post('/auth/login').send(user);
    expect(body.user._id).to.equal(userId);
  });

  /*
  it("should check auth of a user (no success)", async function() {
    const { body } = await request(server).get("/auth").send("jiberish");
    expect(body.msg).to.equals("Unauthorized - no token found");
  })

  it("should check auth of a user (success)", async function() {
    const { body } = await request(server).get("/auth").send(authToken);
    console.log(authToken)
    console.log(body.msg)
    expect(body.msg).to.equals("you have auth");
  }) */

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
