import { expect } from 'chai';
import request from 'supertest';
import { TrackingType } from '../../model/progress';

describe('Progress controller', () => {
  let server: any;
  const courseId = '123456789123456789123459';
  const taskId = '123456789123456789123458';
  const userId = '123456789123456789123457';
  let authToken: string;

  before(async () => {
    server = require('../../app');
    const user = {
      username: 'supervisor',
      password: 'test123',
    };
    const { body } = await request(server).post('/auth/login').send(user);
    authToken = body.token;
  });

  after(() => {
    server.close();
  });

  it('should submit tracking data to a progress not yet created', async () => {
    const body: TrackingType = {
      date: new Date(),
      event: 'TEST',
      value: 'TRACK_VALUE',
    };

    const response = await request(server)
      .put(`/progress/tracking?userId=${userId}&taskId=${taskId}&courseId=${courseId}`)
      .send(body);
    expect(response.status).to.equal(200);
  });

  it('should submit tracking data to a progress', async () => {
    const body: TrackingType = {
      date: new Date(),
      event: 'TEST2',
      value: 'TRACK_VALUE2',
    };

    const response = await request(server)
      .put(`/progress/tracking?userId=${userId}&taskId=${taskId}&courseId=${courseId}`)
      .send(body);
    expect(response.status).to.equal(200);
  });
});
