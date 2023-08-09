import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

let userToken: string;

describe('Edit Course E2E', () => {
	beforeAll(async () => {
		await app.ready();

		const { token } = await createAndAuthenticateUser(app);
		userToken = token;
	});

	afterAll(async () => {
		await app.close();
	});

	it('should edit a course', async () => {
		const { body } = await request(app.server)
			.post('/course')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				name: 'Course 1',
				description: 'Course Description',
			});

		const response = await request(app.server)
			.put('/course')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({
				courseId: body.course.id,
				name: 'New Course Name',
				description: 'New Course Description',
				modulesIds: [],
			});

		expect(response.statusCode).toBe(200);
	});

	it.todo('should add modules to a course when editing');

	it.todo('should not allow to edit a course if fields are missing or invalid');
});
