import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { create } from './create';
import { edit } from './edit';

export async function moduleRoutes(app: FastifyInstance) {
	app.post('/module', { onRequest: [verifyJwt] }, create);

	app.put('/module', { onRequest: [verifyJwt] }, edit);
}
