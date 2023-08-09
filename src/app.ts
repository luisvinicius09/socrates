import fastify, { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';

import { ZodError } from 'zod';
import { env } from './env';

import { userRoutes } from './http/controllers/users/routes';
import { courseRoutes } from './http/controllers/courses/routes';
import { lessonRoutes } from './http/controllers/lessons/routes';

export const app: FastifyInstance = fastify({});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

app.register(userRoutes);
app.register(courseRoutes);
app.register(lessonRoutes);

app.setErrorHandler((error, _req, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error',
			issues: error.format(),
		});
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: send log to better tools like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({ message: 'Internal server error' });
});
