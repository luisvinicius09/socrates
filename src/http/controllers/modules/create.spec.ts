import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

let userToken: string;

describe('Create Module E2E', () => {
	beforeAll(async () => {
		await app.ready();

		const { token } = await createAndAuthenticateUser(app);
		userToken = token;
	});

	afterAll(async () => {
		await app.close();
	});

	it('should create a module', async () => {
		const response = await request(app.server)
			.post('/module')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({ name: 'Module 1' });

		expect(response.statusCode).toBe(201);
	});

	it.todo('should not allow to create a module with invalid fields');
});
