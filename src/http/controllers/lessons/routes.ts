import { FastifyInstance } from 'fastify';
import { create } from './create';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { edit } from './edit';

export async function lessonRoutes(app: FastifyInstance) {
	app.post('/lesson', { onRequest: [verifyJwt] }, create);

	app.put('/lesson', { onRequest: [verifyJwt] }, edit);
}
