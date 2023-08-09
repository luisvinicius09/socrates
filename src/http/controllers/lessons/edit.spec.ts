import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

let userToken: string;

describe('Edit Lesson', () => {
	beforeAll(async () => {
		await app.ready();

		const { token } = await createAndAuthenticateUser(app);
		userToken = token;
	});

	afterAll(async () => {
		await app.close();
	});

	it('should edit a lesson', async () => {
		const { body } = await request(app.server)
			.post('/lesson')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({
				name: 'Lesson 1',
				moduleId: null,
			});

		const response = await request(app.server)
			.put('/lesson')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({
				lessonId: body.lesson.id,
				name: 'Lesson 1',
				moduleId: null,
			});

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			lesson: expect.any(Object),
		});
	});

	it.todo('should add a lesson to a module');

	it.todo('should not allow a lesson to edit if fields are invalid');
});
