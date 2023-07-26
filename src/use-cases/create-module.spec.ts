import { beforeEach, describe, expect, it } from 'vitest';
import { CreateModuleUseCase } from './create-module';
import { InMemoryModulesRepository } from '@/repositories/in-memory/modules-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { RegisterUseCase } from './register';

let usersRepository: InMemoryUsersRepository;
let modulesRepository: InMemoryModulesRepository;

let registerUseCase: RegisterUseCase;
let sut: CreateModuleUseCase;

describe('Create Module Use Case', () => {
	beforeEach(() => {
		modulesRepository = new InMemoryModulesRepository();
		usersRepository = new InMemoryUsersRepository();

		registerUseCase = new RegisterUseCase(usersRepository);
		sut = new CreateModuleUseCase(modulesRepository);
	});

	it('should create module', async () => {
		const { user } = await registerUseCase.execute({
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
