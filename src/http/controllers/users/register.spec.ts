import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Register E2E', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should register a user', async () => {
		const response = await request(app.server).post('/register').send({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: 'joe-doe-pw',
		});

		expect(response.statusCode).toBe(201);
	});

	it('should not allow the same email to register twice', async () => {
		await request(app.server).post('/register').send({
			name: 'John Doe First',
			email: 'johndoe@email.com',
			password: 'joe-doe-pw',
		});

		const response = await request(app.server).post('/register').send({
			name: 'John Doe Second',
			email: 'johndoe@email.com',
			password: 'joe-doe-pw',
		});

		expect(response.statusCode).toBe(409);
		expect(response.body).toEqual({ message: 'User already exists' });
	});
});
