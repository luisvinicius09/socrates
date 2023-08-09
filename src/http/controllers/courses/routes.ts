import { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { create } from './create';
import { edit } from './edit';

export async function courseRoutes(app: FastifyInstance) {
	app.post('/course', { onRequest: [verifyJwt] }, create);

	app.put('/course', { onRequest: [verifyJwt] }, edit);
}
