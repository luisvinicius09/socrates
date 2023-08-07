import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	const authenticateUseCase = makeAuthenticateUseCase();

	try {
		const { email, password } = authenticateBodySchema.parse(req.body);

		const { user } = await authenticateUseCase.execute({ email, password });

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id,
				},
			},
		);

		return reply.status(200).send({ token });
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(401).send({ message: err.message });
		}

		throw err;
	}
}
