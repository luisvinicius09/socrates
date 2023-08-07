import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Authenticate E2E', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should authenticate a user', async () => {
		await request(app.server).post('/register').send({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: 'john-doe-pw',
		});

		const response = await request(app.server).post('/sessions').send({
			email: 'johndoe@email.com',
			password: 'john-doe-pw',
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});

	it('should not authenticate if password is invalid', async () => {
		await request(app.server).post('/register').send({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: 'john-doe-pw',
		});

		const response = await request(app.server).post('/sessions').send({
			email: 'johndoe@email.com',
			password: 'john-doe-wrong',
		});

		expect(response.statusCode).toBe(401);
		expect(response.body).toEqual({ message: 'Invalid credentials' });
	});

	it('should not authenticate if email is invalid', async () => {
		await request(app.server).post('/register').send({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: 'john-doe-pw',
		});

		const response = await request(app.server).post('/sessions').send({
			email: 'joedoe@gmail.com',
			password: 'john-doe-pw',
		});

		expect(response.statusCode).toBe(401);
		expect(response.body).toEqual({ message: 'Invalid credentials' });
	});
});
