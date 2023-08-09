import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { app } from '@/app';

let userToken: string;

describe('Create Course E2E', () => {
	beforeAll(async () => {
		await app.ready();

		const { token } = await createAndAuthenticateUser(app);
		userToken = token;
	});

	afterAll(async () => {
		await app.close();
	});

	it('should create a course', async () => {
		const response = await request(app.server)
			.post('/course')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				name: 'Course 1',
				description: 'Course Description',
			});

		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({
			course: expect.objectContaining({
				id: expect.any(String),
				name: 'Course 1',
				description: 'Course Description',
				userId: expect.any(String),
			}),
		});
	});

	it('should not allow create a course without valid data', async () => {
		const response = await request(app.server)
			.post('/course')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				name: 'Course 1',
			});

		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual({
			message: 'Validation error',
			issues: expect.any(Object),
		});
	});
});
