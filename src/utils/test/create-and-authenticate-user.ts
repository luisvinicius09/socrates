import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {
	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: await hash('john-doe-pw', 6),
		},
	});

	const authResponse = await request(app.server).post('/sessions').send({
		email: 'johndoe@email.com',
		password: 'john-doe-pw',
	});

	const { token } = authResponse.body;

	return { token };
}
