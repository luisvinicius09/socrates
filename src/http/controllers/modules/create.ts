import { makeCreateModuleUseCase } from '@/use-cases/factories/make-create-module-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createModuleBodySchema = z.object({
		name: z.string(),
	});

	const { name } = createModuleBodySchema.parse(request.body);

	const userId = request.user.sub;

	const createModuleUseCase = makeCreateModuleUseCase();

	const { module } = await createModuleUseCase.execute({
		name: name,
		userId: userId,
	});

	return reply.status(201).send({ module });
}
