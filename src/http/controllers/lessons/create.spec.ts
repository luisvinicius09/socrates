import { app } from '@/app';
import { it, afterAll, beforeAll, describe, expect } from 'vitest';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

let userToken: string;

describe('Create Lesson E2E', () => {
	beforeAll(async () => {
		await app.ready();

		const { token } = await createAndAuthenticateUser(app);
		userToken = token;
	});

	afterAll(async () => {
		await app.close();
	});

	it('should create a lesson', async () => {
		const response = await request(app.server)
			.post('/lesson')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({
				name: 'Lesson 1',
				moduleId: null,
			});

		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({ lesson: expect.any(Object) });
	});

	it.todo('should not allow to create lesson if not authenticated');

	it.todo('should not allow to create lesson if fields are invalid');
});
