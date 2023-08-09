import { makeCreateLessonUseCase } from '@/use-cases/factories/make-create-lesson-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createLessonBodySchema = z.object({
		name: z.string(),
		moduleId: z.string().nullable(),
	});

	const userId = request.user.sub;

	const { name, moduleId } = createLessonBodySchema.parse(request.body);

	const createLessonUseCase = makeCreateLessonUseCase();

	const { lesson } = await createLessonUseCase.execute({
		name: name,
		moduleId: moduleId,
		userId: userId,
	});

	return reply.status(201).send({ lesson });
}
