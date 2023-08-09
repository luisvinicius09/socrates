import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { app } from '@/app';

let userToken: string;

describe('Edit Module E2E', () => {
	beforeAll(async () => {
		await app.ready();

		const { token } = await createAndAuthenticateUser(app);
		userToken = token;
	});

	afterAll(async () => {
		await app.close();
	});

	it('should edit a module', async () => {
		const { body } = await request(app.server)
			.post('/module')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({ name: 'Module 1' });

		const response = await request(app.server)
			.put('/module')
			.set({ Authorization: `Bearer ${userToken}` })
			.send({ moduleId: body.module.id, name: 'New Module Name' });

		expect(response.statusCode).toBe(200);
	});

	it.todo('should not allow to edit a module with invalid fields');
});
