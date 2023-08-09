import { makeEditModuleUseCase } from '@/use-cases/factories/make-edit-module-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function edit(request: FastifyRequest, reply: FastifyReply) {
	const editModuleBodySchema = z.object({
		moduleId: z.string(),
		name: z.string(),
	});

	const { moduleId, name } = editModuleBodySchema.parse(request.body);

	const editModuleUseCase = makeEditModuleUseCase();

	const { module } = await editModuleUseCase.execute({
		moduleId: moduleId,
		name: name,
	});

	return reply.status(200).send({ module });
}
