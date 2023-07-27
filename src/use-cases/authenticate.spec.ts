import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUseCase(usersRepository);
	});

	it('should authenticate the user', async () => {
		await usersRepository.create({
			email: 'joe-doe@email.com',
			password: await hash('joe-doe-pw', 6),
		});

		const { user } = await sut.execute({
			email: 'joe-doe@email.com',
			password: 'joe-doe-pw',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not authenticate the user with invalid email', async () => {
		await usersRepository.create({
			email: 'joe-doe@email.com',
			password: await hash('joe-doe-pw', 6),
		});

		await expect(
			sut.execute({
				email: 'joe-doe@wrong.com',
				password: 'jow-doe-pw',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('should not authenticate the user with invalid password', async () => {
		await usersRepository.create({
			email: 'joe-doe@email.com',
			password: await hash('joe-doe-pw', 6),
		});

		await expect(
			sut.execute({
				email: 'joe-doe@email.com',
				password: 'jow-doe',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
