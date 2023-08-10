import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { hash } from 'bcryptjs';

let usersRepository: UsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(usersRepository);
	});

	it('should get the user profile', async () => {
		const userCreated = await usersRepository.create({
			email: 'joe-doe@email.com',
			password: await hash('joe-doe-pw', 6),
		});

		const { user } = await sut.execute({
			userId: userCreated.id,
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it.todo('');
});
