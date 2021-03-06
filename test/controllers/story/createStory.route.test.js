const request = require('supertest');
const { equal } = require('assert');
const { app } = require('../../../src/app');
const { Story } = require('../../../src/models/story.model');

describe('Test POST /story', () => {
    it('Can create new story', async () => {
        const response = await request(app)
        .post('/story')
        .send({ content: 'ABCD' });
        const { success, story } = response.body;
        equal(success, true);
        equal(story.content, 'ABCD');
        const storyDb = await Story.findOne({});
        equal(storyDb.content, 'ABCD');
        equal(storyDb._id, story._id);
    });

    it('Cannot create new story with empty content', async () => {
        const response = await request(app)
        .post('/story')
        .send({ content: '' });
        const { success, story } = response.body;
        equal(response.status, 400);
        equal(success, false);
        equal(story, undefined);
        const storyDb = await Story.findOne({});
        equal(storyDb, null);
    });
});
