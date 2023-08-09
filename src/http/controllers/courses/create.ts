import { makeCreateCourseUseCase } from '@/use-cases/factories/make-create-course-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createCourseBodySchema = z.object({
		name: z.string(),
		description: z.string(),
	});

	const createCourseUseCase = makeCreateCourseUseCase();

	const userId = request.user.sub;

	const { name, description } = createCourseBodySchema.parse(request.body);

	const { course } = await createCourseUseCase.execute({ name, description, userId });

	return reply.status(201).send({ course });
}
