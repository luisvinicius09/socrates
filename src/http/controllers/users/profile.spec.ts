import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

let userToken: string;

describe('Get User Profile E2E', () => {
	beforeAll(async () => {
		await app.ready();

		const { token } = await createAndAuthenticateUser(app);
		userToken = token;
	});

	afterAll(async () => {
		await app.close();
	});

	it('should get the user profile info', async () => {
		const { body } = await request(app.server)
			.get('/me')
			.set({ Authorization: `Bearer ${userToken}` })
			.send();

		expect(body.user.id).toEqual(expect.any(String));
	});
});
