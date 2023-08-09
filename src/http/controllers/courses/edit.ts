import { makeEditCourseUseCase } from '@/use-cases/factories/make-edit-course-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function edit(request: FastifyRequest, reply: FastifyReply) {
	const editCourseBodySchema = z.object({
		courseId: z.string(),
		name: z.string(),
		description: z.string(),
		modulesIds: z.array(z.string()),
	});

	const { courseId, name, description, modulesIds } = editCourseBodySchema.parse(
		request.body,
	);

	const editCourseUseCase = makeEditCourseUseCase();

	const { course } = await editCourseUseCase.execute({
		courseId,
		name,
		description,
		modulesIds,
	});

	return reply.status(200).send({ course });
}
