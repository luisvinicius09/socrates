import { makeEditLessonUseCase } from '@/use-cases/factories/make-edit-lesson-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function edit(request: FastifyRequest, reply: FastifyReply) {
	const editLessonBodySchema = z.object({
		lessonId: z.string(),
		name: z.string(),
		moduleId: z.string().nullable(),
	});

	const { lessonId, name, moduleId } = editLessonBodySchema.parse(request.body);

	const editLessonUseCase = makeEditLessonUseCase();

	const { lesson } = await editLessonUseCase.execute({
		lessonId: lessonId,
		moduleId: moduleId,
		name: name,
	});

	return reply.status(200).send({ lesson });
}
