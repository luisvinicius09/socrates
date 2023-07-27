import { beforeEach, describe, expect, it } from 'vitest';
import { CreateModuleUseCase } from './create-module';
import { InMemoryModulesRepository } from '@/repositories/in-memory/modules-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { ModulesRepository } from '@/repositories/interfaces/modules-repository';

let usersRepository: UsersRepository;
let modulesRepository: ModulesRepository;

let sut: CreateModuleUseCase;

describe('Create Module Use Case', () => {
	beforeEach(() => {
		modulesRepository = new InMemoryModulesRepository();
		usersRepository = new InMemoryUsersRepository();

		sut = new CreateModuleUseCase(modulesRepository);
	});

	it('should create module', async () => {
		const user = await usersRepository.create({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const { module } = await sut.execute({
			name: 'Module 1',
			userId: user.id,
		});

		expect(module.id).toEqual(expect.any(String));
	});

	it.todo('', () => {});
});
